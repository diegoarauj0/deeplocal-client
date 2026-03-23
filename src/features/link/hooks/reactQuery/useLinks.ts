import { getAllLinksByUserIdService, type InterfaceLinksResponse } from "../../services/link.service";
import { useQuery } from "@tanstack/react-query";

export function useLinks(userId?: string) {
  return useQuery<InterfaceLinksResponse>({
    queryKey: ["links", userId ?? ""],
    queryFn: () => getAllLinksByUserIdService(userId!),
    enabled: Boolean(userId),
    refetchOnWindowFocus: true,
  });
}
