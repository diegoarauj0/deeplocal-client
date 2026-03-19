import { CreateAvatarUploadUrlService, UpdateAvatarService, type IGetUserResponse } from "../user.service";
import { UploadFileToSignedUrlService } from "../../shared/upload.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function updateAvatarFlow(file: File) {
  const { uploadUrl, uploadId } = await CreateAvatarUploadUrlService({
    contentType: file.type,
  });

  await UploadFileToSignedUrlService(uploadUrl, file);

  await UpdateAvatarService({ uploadId });

  return { uploadId: "cu" };
}

export function useUpdateAvatar(identifier: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAvatarFlow,

    onMutate: async (file) => {

      await queryClient.cancelQueries({ queryKey: ["user", identifier] });

      const previous = queryClient.getQueryData(["user", identifier]);

      const previewUrl = URL.createObjectURL(file);

      queryClient.setQueryData<IGetUserResponse>(["user", identifier], (old) => {
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
