const foundItemFormValidator = (values) => {
  const errors = {};

  if (!values.hash) errors.hash = 'Required';

  return errors;
};

export default foundItemFormValidator;
