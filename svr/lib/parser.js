export const parseImage = (content) => {
  let img = content.match(/src="([^"]+)"/)
  return img && img.length > 1 && img[1] || undefined;
}

export const checkHtml = (content) => {
  let found = content.match(/<[a-z][\s\S]*>/i)
  return found && found.length && true || false;
}

export const encodeHtml = (content) => {
  return String(content).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
