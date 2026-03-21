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

        const newLink = {
          ...createLinkData,
          userId,
          ID: tempId,
          enabled: true,
          createdAt: new Date().toISOString(),
          _optimistic: true,
        };

        return {
          ...old,
          length: old.length + 1,
          links: [newLink, ...old.links],
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
          links: old.links.map((link) => (link.ID === context?.tempId ? newLink : link)),
        };
      });

      queryClient.setQueryData<InterfaceLinksResponse>(["links", userId], (old) => {
        if (!old) return old;

        return {
          ...old,
          links: old.links.map((link) => (link.ID === context?.tempId ? newLink : link)),
        } as InterfaceLinksResponse;
      });
    },
  });
}
