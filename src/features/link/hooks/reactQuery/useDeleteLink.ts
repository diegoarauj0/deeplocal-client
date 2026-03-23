import { deleteLinkService, type InterfaceLinksResponse } from "../../services/link.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteLink(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLinkService,

    onMutate: async (linkId: string) => {
      await queryClient.cancelQueries({ queryKey: ["links", userId] });

      const previous = queryClient.getQueryData<InterfaceLinksResponse>(["links", userId]);

      queryClient.setQueryData<InterfaceLinksResponse>(["links", userId], (old) => {
        if (!old) return old;

        return {
          ...old,
          length: old.length - 1,
          links: old.links.filter((link) => link.ID !== linkId),
        };
      });

      return { previous };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(["links", userId], context?.previous);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", userId] });
    },
  });
}
