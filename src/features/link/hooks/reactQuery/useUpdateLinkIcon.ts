import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFileToSignedUrlService } from "../../../shared/services/upload.service";
import {
  type InterfaceLinkResponse,
  type InterfaceLinksResponse,
  createIconUploadUrlService,
  updateIconService,
} from "../../services/link.service";

interface InterfaceUpdateLinkIconPayload {
  linkId: string;
  file: File;
  previewUrl: string;
}

interface InterfaceUpdateLinkIconContext {
  previous?: InterfaceLinksResponse;
}

async function updateLinkIconFlow({ linkId, file }: InterfaceUpdateLinkIconPayload) {
  const { uploadUrl, uploadId } = await createIconUploadUrlService({ id: linkId, contentType: file.type });

  await uploadFileToSignedUrlService(uploadUrl, file);

  return updateIconService({ uploadId });
}

export function useUpdateLinkIcon(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLinkIconFlow,

    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["links", userId] });

      const previous = queryClient.getQueryData<InterfaceLinksResponse>(["links", userId]);

      queryClient.setQueryData<InterfaceLinksResponse>(["links", userId], (old) => {
        if (!old) return old;

        return {
          ...old,
          links: old.links.map((link) => (link.ID === payload.linkId ? { ...link, icon: payload.previewUrl } : link)),
        };
      });

      return { previous } as InterfaceUpdateLinkIconContext;
    },

    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["links", userId], context.previous);
      }
    },

    onSuccess: (response: InterfaceLinkResponse) => {
      const updatedLink = response.link;

      queryClient.setQueryData<InterfaceLinksResponse>(["links", userId], (old) => {
        if (!old) return old;

        return {
          ...old,
          links: old.links.map((link) => (link.ID === updatedLink.ID ? updatedLink : link)),
        };
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["links", userId] });
    },
  });
}
