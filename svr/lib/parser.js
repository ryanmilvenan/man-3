export const checkHtml = (content) => {
  let found = content.match(/<[a-z][\s\S]*>/i)
  return found && found.length && true || false;
}

export const processEntries = (entries) => {
  return entries.map((item) => {
    if(checkHtml(item.content)) {
      return {
        ...item,
        raw_html: {__html: item.content}
      }
    } else {
      return item; 
    }
  });
}
