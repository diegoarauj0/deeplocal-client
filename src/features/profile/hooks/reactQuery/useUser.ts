import { getUserService } from "../../services/user.service";
import { useQuery } from "@tanstack/react-query";

export function useUser(identifier: string) {
  return useQuery({
    queryKey: ["user", identifier],
    queryFn: () => getUserService(identifier),
  });
}
