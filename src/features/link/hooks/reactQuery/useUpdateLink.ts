import { type InterfaceLinksResponse, type InterfaceUpdateLinkData, updateLinkService } from "../../services/link.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface InterfaceUpdateLinkContext {
  previous?: InterfaceLinksResponse;
}

export function useUpdateLink(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLinkService,

    onMutate: async (updateLinkData: InterfaceUpdateLinkData) => {
      await queryClient.cancelQueries({ queryKey: ["links", userId] });

      const previous = queryClient.getQueryData<InterfaceLinksResponse>(["links", userId]);

      queryClient.setQueryData<InterfaceLinksResponse>(["links", userId], (old) => {
        if (!old) return old;

        return {
          ...old,
          links: old.links.map((link) =>
            link.ID === updateLinkData.id ? { ...link, title: updateLinkData.title, url: updateLinkData.url } : link,
          ),
        };
      });

      return { previous } as InterfaceUpdateLinkContext;
    },

    onError: (_err, _data, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["links", userId], context.previous);
      }
    },

    onSuccess: (response) => {
      const updatedLink = response.link;

      queryClient.setQueryData<InterfaceLinksResponse>(["links", userId], (old) => {
        if (!old) return old;

        return {
          ...old,
          links: old.links.map((link) => (link.ID === updatedLink.ID ? updatedLink : link)),
        };
      });
    },
  });
}
