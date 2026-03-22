import { deepLocalInstance, type InterfacePublicLink } from "../../shared/deeplocal.http";

const LINK_ROUTES: Record<string, { URL: (...args: string[]) => string; METHOD: "post" | "get" | "patch" }> = {
  GET_ALL_LINKS_BY_USER_ID: { URL: (userId: string) => `/api/links/user/${userId}`, METHOD: "get" },
  REORDER_LINK: { URL: (id: string) => `api/links/${id}/reorder`, METHOD: "patch" },
  GET_LINK: { URL: (id: string) => `api/links/${id}`, METHOD: "get" },
  CREATE_LINK: { URL: () => "api/links", METHOD: "post" },
};

interface InterfaceCreateLinkData {
  title: string;
  url: string;
}

export interface InterfaceLinkResponse {
  link: InterfacePublicLink;
}

export interface InterfaceLinksResponse {
  links: InterfacePublicLink[];
  length: number;
}

export async function createLinkService(data: InterfaceCreateLinkData): Promise<InterfaceLinkResponse> {
  const METHOD = LINK_ROUTES.CREATE_LINK.METHOD;
  const URL = LINK_ROUTES.CREATE_LINK.URL();

  console.log(`[LinkService] createLinkService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance[METHOD](URL, data);
  return response.data;
}

export async function getLinkService(id: string): Promise<InterfaceLinkResponse> {
  const METHOD = LINK_ROUTES.GET_LINK.METHOD;
  const URL = LINK_ROUTES.GET_LINK.URL(id);

  console.log(`[LinkService] getLinkService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance[METHOD](URL);
  return response.data;
}

export async function getAllLinksByUserIdService(userId: string): Promise<InterfaceLinksResponse> {
  const METHOD = LINK_ROUTES.GET_ALL_LINKS_BY_USER_ID.METHOD;
  const URL = LINK_ROUTES.GET_ALL_LINKS_BY_USER_ID.URL(userId);

  console.log(`[LinkService] getAllLinksByUserIdService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance[METHOD](URL);
  return response.data;
}

interface InterfaceReorderLinkData {
  beforeId?: string;
  afterId?: string;
  id: string;
}

export async function reorderLinkService(data: InterfaceReorderLinkData): Promise<InterfaceLinkResponse> {
  const METHOD = LINK_ROUTES.REORDER_LINK.METHOD;
  const URL = LINK_ROUTES.REORDER_LINK.URL(data.id);

  console.log(`[LinkService] reorderLinkService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance[METHOD](URL, { beforeId: data.beforeId, afterId: data.afterId });
  return response.data;
}
