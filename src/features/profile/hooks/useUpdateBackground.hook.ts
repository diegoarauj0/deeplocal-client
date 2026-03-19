import { CreateBackgroundUploadUrlService, UpdateBackgroundService, type IGetUserResponse } from "../user.service";
import { UploadFileToSignedUrlService } from "../../shared/upload.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function updateBackgroundFlow(file: File) {
  const { uploadUrl, uploadId } = await CreateBackgroundUploadUrlService({
    contentType: file.type,
  });

  await UploadFileToSignedUrlService(uploadUrl, file);

  await UpdateBackgroundService({ uploadId });

  return { uploadId: "cu" };
}

export function useUpdateBackground(identifier: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBackgroundFlow,

    onMutate: async (file) => {

      await queryClient.cancelQueries({ queryKey: ["user", identifier] });

      const previous = queryClient.getQueryData(["user", identifier]);

      const previewUrl = URL.createObjectURL(file);

      queryClient.setQueryData<IGetUserResponse>(["user", identifier], (old) => {
        if (!old) return old;

        return { user: { ...old.user, background: previewUrl } };
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
