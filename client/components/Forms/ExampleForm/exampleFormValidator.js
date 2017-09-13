const exampleFormValidator = (values) => {
  const errors = {};

  if (!values.username) errors.username = 'Required';
  if (!values.password) errors.password = 'Required';

  return errors;
};

export default exampleFormValidator;
