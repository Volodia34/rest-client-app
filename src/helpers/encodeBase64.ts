export const encodeBase64 = (str: string): string => {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
};

export const decodeBase64 = (str: string): string => {
  const decodedBinaryString = atob(str);
  const decoder = new TextDecoder();
  const bytes = new Uint8Array(decodedBinaryString.length);

  for (let i = 0; i < decodedBinaryString.length; i++) {
    bytes[i] = decodedBinaryString.charCodeAt(i);
  }

  return decoder.decode(bytes);
};
