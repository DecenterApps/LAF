export const isUriImage = (uri) => {
  if (!uri) return false;
  const uriNoParam = uri.split('?')[0];
  const parts = uriNoParam.split('.');
  const extension = parts[parts.length - 1];
  const imageTypes = ['jpg', 'jpeg', 'tiff', 'png', 'gif', 'bmp'];
  return imageTypes.indexOf(extension) !== -1;
};

export const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
  return re.test(email);
};
