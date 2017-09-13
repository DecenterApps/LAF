import { isUriImage, isValidEmail } from '../../../modules/utils';

const addItemFormValidator = (values) => {
  const errors = {};

  if (!values.name) errors.name = 'Required';
  if (!values.location) errors.location = 'Required';
  if (!values.imageUrl) errors.imageUrl = 'Required';
  if (!values.email) errors.email = 'Required';
  if (!values.phoneNumber) errors.phoneNumber = 'Required';

  if (values.imageUrl && !isUriImage(values.imageUrl)) errors.imageUrl = 'Url does not contain valid image extension';
  if (values.email && !isValidEmail(values.email)) errors.email = 'Email address is not valid';

  return errors;
};

export default addItemFormValidator;
