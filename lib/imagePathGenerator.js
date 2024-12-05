"use server";
export async function imagePathGenerator({ src, width, quality }) {
  return `/assets/images/heroImage/${src}?w=${width}&q=${quality || 75}`;
}
