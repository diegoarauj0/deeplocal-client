import { useQuery } from "@tanstack/react-query";
import { GetUserService } from "../user.service";

export function useUser(identifier: string) {
  return useQuery({
    queryKey: ["user", identifier],
    queryFn: () => GetUserService(identifier),
  });
}
