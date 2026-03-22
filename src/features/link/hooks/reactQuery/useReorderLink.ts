import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reorderLinkService, type InterfaceLinksResponse } from "../../services/link.service";
import { linkConstant } from "../../constants/link.constant";

export function useReorderLink(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reorderLinkService,
    onMutate: async ({ afterId, beforeId, id }) => {
      await queryClient.cancelQueries({ queryKey: ["links", userId] });

      const previousLinks = queryClient.getQueryData<InterfaceLinksResponse>(["links", userId]);

      queryClient.setQueryData<InterfaceLinksResponse>(["links", userId], (old) => {
        if (!old) return old;

        const links = [...old.links];

        links.sort((a, b) => a.position - b.position);

        const linkIndex = links.findIndex((link) => link.ID === id);

        let targetLink = links.find((link) => link.ID === afterId);
        let targetIndex = links.findIndex((link) => link.ID === afterId);

        if (targetLink !== undefined) {
          //after
          const afterLink = links[targetIndex + 1];

          if (afterLink === undefined) {
            const gap = targetLink.position + linkConstant.POSITION_STEP;

            links[linkIndex].position = gap;

            return { length: old.length, links: links.sort((a, b) => a.position - b.position) };
          }

          const afterIndex = links.findIndex((link) => link.ID === afterLink?.ID);

          if (afterIndex === linkIndex) {
            return { length: old.length, links: links.sort((a, b) => a.position - b.position) };
          }

          const gap = (targetLink.position + afterLink.position) / 2;

          links[linkIndex].position = gap;

          return { length: old.length, links: links.sort((a, b) => a.position - b.position) };
        }

        targetLink = links.find((link) => link.ID === beforeId);
        targetIndex = links.findIndex((link) => link.ID === beforeId);

        if (targetLink !== undefined) {
          //before
          const beforeLink = links[targetIndex - 1];

          if (beforeLink === undefined) {
            const gap = targetLink.position - linkConstant.POSITION_STEP;

            links[linkIndex].position = gap;

            return { length: old.length, links: links.sort((a, b) => a.position - b.position) };
          }

          const beforeIndex = links.findIndex((link) => link.ID === beforeLink?.ID);

          if (beforeIndex === linkIndex) {
            return { length: old.length, links: links.sort((a, b) => a.position - b.position) };
          }

          const gap = (targetLink.position + beforeLink.position) / 2;

          links[linkIndex].position = gap;

          return { length: old.length, links: links.sort((a, b) => a.position - b.position) };
        }

        return old
      });

      return { previousLinks };
    },

    onError: (_err, _newLinks, context) => {
      if (context?.previousLinks) {
        queryClient.setQueryData(["links", userId], context.previousLinks);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["links", userId] });
    },
  });
}
