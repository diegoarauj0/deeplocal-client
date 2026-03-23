import axios from "axios";

export async function uploadFileToSignedUrlService(uploadUrl: string, file: File): Promise<void> {
  console.log(`[UploadService] uploadFileToSignedUrlService PUT: ${uploadUrl}`);

  await axios.put(uploadUrl, file, { headers: { "Content-Type": file.type } });
}
