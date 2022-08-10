/* Add a Cdn library and provide a function to be called when
the library loads successfully */
const addCdnLibrary = (url, callback) => {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.type = 'text/javascript';
  script.onload = callback;
  document.body.appendChild(script);
};

export default addCdnLibrary;
