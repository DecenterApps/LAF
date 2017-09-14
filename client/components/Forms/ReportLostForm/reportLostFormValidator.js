const reportLostFormValidator = (values) => {
  const errors = {};

  if (!values.prize) errors.prize = 'Required';

  if (values.prize) {
    const commaError = values.prize && values.prize.indexOf(',') > 0;
    const nanError = isNaN(parseFloat(values.prize));
    const toSmallError = !nanError && parseInt(web3.toWei(values.prize, 'ether'), 10) < 1; // eslint-disable-line

    if (commaError) errors.prize = 'Use a full stop as a delimiter instead of a comma';
    if (toSmallError) errors.prize = 'Smallest prize is one wei';
    if (nanError) errors.prize = 'The provided input is not a number';
  }

  return errors;
};

export default reportLostFormValidator;
