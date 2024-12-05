let urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export const imageKitLoader = ({ src, width, quality = 75, blur = 0 }) => {
  // Ensure src is valid
  if (!src) throw new Error("ImageKitLoader: 'src' is required.");

  // Remove quotes and unnecessary characters from src
  src = src.replace(/^["']|["']$/g, "").trim();

  const params = [`w-${width}`, `q-${quality}`, `bl-${blur}`, "f-webp"];
  const paramsString = params.join(",");

  // If src is an absolute URL, return as-is (optional for Next.js)
  if (src.startsWith("http")) {
    return `${src}?tr=${paramsString}`;
  }

  // Trim leading slash if present
  if (src[0] === "/") src = src.slice(1);

  if (urlEndpoint.endsWith("/")) {
    urlEndpoint = urlEndpoint.slice(0, -1);
  }

  return `${urlEndpoint}/${src}?tr=${paramsString}`;
};

// Function to generate a low-res placeholder URL for blurDataURL
export const imageKitBlurLoader = ({ src }) => {
  src = src.replace(/^["']|["']$/g, "").trim();
  if (src.startsWith("http")) {
    return src;
  }

  if (src[0] === "/") src = src.slice(1);
  const params = ["w-10", "q-10", "f-webp"];
  const paramsString = params.join(",");
  if (urlEndpoint[urlEndpoint.length - 1] === "/")
    urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);

  return `${urlEndpoint}/${src}?tr=${paramsString}`;
};
