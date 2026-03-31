import { uploadFileToSignedUrlService } from "../../../shared/services/upload.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as userService from "../../services/user.service";

async function updateAvatarFlow(file: File) {
  const { uploadUrl, uploadId } = await userService.createAvatarUploadUrlService({
    contentType: file.type,
  });

  await uploadFileToSignedUrlService(uploadUrl, file);

  await userService.updateAvatarService({ uploadId });

  return { uploadUrl, uploadId };
}

export function useUpdateAvatar(identifier: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAvatarFlow,

    onMutate: async (file) => {
      await queryClient.cancelQueries({ queryKey: ["user", identifier] });

      const previous = queryClient.getQueryData(["user", identifier]);

      const previewUrl = URL.createObjectURL(file);

      queryClient.setQueryData<userService.InterfaceUserResponse>(["user", identifier], (old) => {
        if (!old) return old;

        return { user: { ...old.user, avatar: previewUrl } };
      });

      return { previous };
    },

    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["user", identifier], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user", identifier] });
    },
  });
}
