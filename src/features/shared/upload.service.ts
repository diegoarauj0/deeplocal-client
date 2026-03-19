import axios from "axios";

export async function UploadFileToSignedUrlService(uploadUrl: string, file: File): Promise<void> {
  console.log(`[UploadService] UploadFileToSignedUrlService PUT: ${uploadUrl}`);

  await axios.put(uploadUrl, file, { headers: { "Content-Type": file.type } });
}
