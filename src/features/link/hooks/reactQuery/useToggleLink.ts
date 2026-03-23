import { type InterfaceLinksResponse, toggleVisibilityService } from "../../services/link.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useToggleLink(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleVisibilityService,

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["links", userId] });

      const previous = queryClient.getQueryData<InterfaceLinksResponse>(["links", userId]);

      queryClient.setQueryData<InterfaceLinksResponse>(["links", userId], (old) => {
        if (!old) return old;

        return {
          ...old,
          links: old.links.map((link) => (link.ID === id ? { ...link, enabled: !link.enabled } : link)),
        };
      });

      return { previous };
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
