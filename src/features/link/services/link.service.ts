import { deepLocalInstance, type InterfacePublicLink } from "../../shared/deeplocal.http";

const LINK_ROUTES: Record<string, { URL: (...args: string[]) => string; METHOD: "post" | "get" | "patch" }> = {
  GET_ALL_LINKS_BY_USER_ID: { URL: (userId: string) => `/api/links/user/${userId}`, METHOD: "get" },
  GET_LINK: { URL: (id: string) => `api/links/${id}`, METHOD: "get" },
  CREATE_LINK: { URL: () => "api/links", METHOD: "post" },
};

interface InterfaceCreateLinkData {
  title: string,
  url: string
}

interface InterfaceLinkResponse {
  link: InterfacePublicLink;
}

export interface InterfaceLinksResponse {
  links: InterfacePublicLink[];
  length: number
}

export async function createLinkService(
  data: InterfaceCreateLinkData,
): Promise<InterfaceLinkResponse> {
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