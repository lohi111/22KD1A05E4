export const saveUrl = (urlObj) => {
  let urls = JSON.parse(localStorage.getItem("urls")) || [];
  // replace existing shortcode if already present
  urls = urls.filter(u => u.shortcode !== urlObj.shortcode);
  urls.push(urlObj);
  localStorage.setItem("urls", JSON.stringify(urls));
};

export const getUrls = () => {
  return JSON.parse(localStorage.getItem("urls")) || [];
};
