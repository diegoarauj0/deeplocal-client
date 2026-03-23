import { linkConstant } from "../../constants/link.constant";
import { createLinkService, type InterfaceLinksResponse } from "../../services/link.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateLink(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLinkService,

    onMutate: async (createLinkData) => {
      await queryClient.cancelQueries({ queryKey: ["links", userId] });

      const previous = queryClient.getQueryData<InterfaceLinksResponse>(["links", userId]);

      const tempId = `temp-${crypto.randomUUID()}`;

      queryClient.setQueryData<InterfaceLinksResponse>(["links", userId], (old) => {
        if (!old) return old;

        const links = old.links.sort((a, b) => a.position - b.position);
        const newestLink = links[links.length - 1];

        const newLink = {
          ...createLinkData,
          userId,
          ID: tempId,
          position:
            newestLink === undefined ? linkConstant.POSITION_STEP : newestLink.position + linkConstant.POSITION_STEP,
          enabled: true,
          createdAt: new Date().toISOString(),
          _optimistic: true,
        };

        return {
          ...old,
          length: old.length + 1,
          links: [newLink, ...old.links].sort((a, b) => a.position - b.position),
        } as InterfaceLinksResponse;
      });

      return { previous, tempId };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(["links", userId], context?.previous);
    },

    onSuccess: (response, _, context) => {
      const newLink = response.link;

      queryClient.setQueryData<InterfaceLinksResponse>(["links", userId], (old) => {
        if (!old) return old;

        return {
          ...old,
          links: old.links
            .map((link) => (link.ID === context?.tempId ? newLink : link))
            .sort((a, b) => a.position - b.position),
        };
      });
    },
  });
}
