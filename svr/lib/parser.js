export const checkHtml = (content) => {
  let found = content.match(/<[a-z][\s\S]*>/i)
  return found && found.length && true || false;
}
