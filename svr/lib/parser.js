export const parseImage = (content) => {
  let img = content.match(/src="([^"]+)"/)
  return img && img.length > 1 && img[1] || undefined;
}
