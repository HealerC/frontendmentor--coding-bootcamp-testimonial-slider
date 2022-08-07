const addCdnLibrary = (url, callback) => {
  const script = document.createElement("script");
  script.src = url;
  script.async = true;
  script.type = "text/javascript";
  script.onload = callback;
  document.body.appendChild(script);
};

export default addCdnLibrary;
