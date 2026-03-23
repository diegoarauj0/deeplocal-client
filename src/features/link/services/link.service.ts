import type {
  InterfaceCreateUploadUrlData,
  InterfaceCreateUploadUrlResponse,
  InterfaceUpdateFileData,
} from "../../profile/services/user.service";
import { deepLocalInstance, type InterfacePublicLink } from "../../shared/deeplocal.http";

const LINK_ROUTES: Record<string, { URL: (...args: string[]) => string; METHOD: "post" | "get" | "patch" | "delete" }> =
  {
    GET_ALL_LINKS_BY_USER_ID: { URL: (userId: string) => `/api/links/user/${userId}`, METHOD: "get" },
    REORDER_LINK: { URL: (id: string) => `api/links/${id}/reorder`, METHOD: "patch" },
    GET_LINK: { URL: (id: string) => `api/links/${id}`, METHOD: "get" },
    CREATE_LINK: { URL: () => "api/links", METHOD: "post" },
    UPDATE_LINK: { URL: (id: string) => `api/links/${id}`, METHOD: "patch" },
    DELETE_LINK: { URL: (id: string) => `api/links/${id}`, METHOD: "delete" },
    TOGGLE_VISIBILITY: { URL: (id: string) => `api/links/toggle/${id}`, METHOD: "patch" },
    CREATE_ICON_UPLOAD_URL: { URL: (id: string) => `/api/links/icon/upload-url/${id}`, METHOD: "post" },
    UPDATE_ICON: { URL: () => "api/links/icon", METHOD: "patch" },
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

export async function deleteLinkService(id: string): Promise<void> {
  const METHOD = LINK_ROUTES.DELETE_LINK.METHOD;
  const URL = LINK_ROUTES.DELETE_LINK.URL(id);

  console.log(`[LinkService] deleteLinkService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance[METHOD](URL);
  return response.data;
}

export interface InterfaceUpdateLinkData {
  title: string;
  url: string;
  id: string;
}

export async function updateLinkService(data: InterfaceUpdateLinkData): Promise<InterfaceLinkResponse> {
  const METHOD = LINK_ROUTES.UPDATE_LINK.METHOD;
  const URL = LINK_ROUTES.UPDATE_LINK.URL(data.id);

  console.log(`[LinkService] updateLinkService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance[METHOD](URL, {
    title: data.title,
    url: data.url,
  });

  return response.data;
}

export async function toggleVisibilityService(id: string): Promise<InterfaceLinkResponse> {
  const METHOD = LINK_ROUTES.TOGGLE_VISIBILITY.METHOD;
  const URL = LINK_ROUTES.TOGGLE_VISIBILITY.URL(id);

  console.log(`[LinkService] toggleVisibilityService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance[METHOD](URL);

  return response.data;
}

export async function createIconUploadUrlService(
  data: InterfaceCreateUploadUrlData & { id: string },
): Promise<InterfaceCreateUploadUrlResponse> {
  const METHOD = LINK_ROUTES.CREATE_ICON_UPLOAD_URL.METHOD;
  const URL = LINK_ROUTES.CREATE_ICON_UPLOAD_URL.URL(data.id);

  console.log(`[LinkService] createIconUploadUrlService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance[METHOD](URL, { contentType: data.contentType });
  return response.data;
}

export async function updateIconService(data: InterfaceUpdateFileData): Promise<InterfaceLinkResponse> {
  const METHOD = LINK_ROUTES.UPDATE_ICON.METHOD;
  const URL = LINK_ROUTES.UPDATE_ICON.URL();

  console.log(`[LinkService] updateIconService ${METHOD.toUpperCase()}: ${URL}`);

  const response = await deepLocalInstance[METHOD](URL, data);
  return response.data;
}
