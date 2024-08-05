import supabase from "@/supaBase/supabaseClient";

// Base64 문자열을 Blob으로 변환하는 함수
export const base64ToBlob = (base64: string, mime: string): Blob => {
  const sliceSize = 512;
  const byteCharacters = atob(base64);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; sliceIndex++) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);
    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; offset++, i++) {
      bytes[i] = byteCharacters.charCodeAt(offset);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }

  return new Blob(byteArrays, { type: mime });
};

// Base64 문자열을 Blob으로 변환 후 업로드하는 함수
export const uploadImage = async (
  base64Image: string,
  fileName: string
): Promise<string | null> => {
  try {
    // Base64 문자열에서 MIME 타입과 실제 Base64 문자열을 분리합니다.
    const [mimeType, base64String] = base64Image.split(";base64,") as [
      string,
      string
    ];
    const mime = mimeType.split(":")[1];

    // Base64 문자열을 Blob으로 변환
    const blob = base64ToBlob(base64String, mime);

    // Supabase Storage에 파일 업로드
    const { data, error: uploadError } = await supabase.storage
      .from("profileBucket") // 버킷 이름
      .upload(`profile-images/${fileName}`, blob, {
        contentType: mime,
      });

    if (uploadError) {
      console.error("업로드 오류:", uploadError.message);
      return null;
    }

    // 파일의 URL 생성
    const { publicURL, error: urlError } = supabase.storage
      .from("profileBucket")
      .getPublicUrl(`profile-images/${fileName}`);

    if (urlError) {
      console.error("URL 생성 오류:", urlError.message);
      return null;
    }

    return publicURL;
  } catch (error) {
    console.error("예외 발생:", (error as Error).message);
    return null;
  }
};
