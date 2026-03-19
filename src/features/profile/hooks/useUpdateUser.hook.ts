import { UpdateUserService, type IGetUserResponse } from "../user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUser(identifier: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UpdateUserService,
    onMutate: async (updateUserData) => {
      await queryClient.cancelQueries({ queryKey: ["user", identifier] });

      const previous = queryClient.getQueryData(["user", identifier]);

      queryClient.setQueryData<IGetUserResponse>(["user", identifier], (old) => {
        if (!old) return old;

        return { user: { ...old.user, ...updateUserData } };
      });

      return { previous };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["user", identifier], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user", identifier] });
    },
  });
}
