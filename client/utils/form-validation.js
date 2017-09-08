export const inputTypes = {
  text: 'text',
  number: 'number',
};

export const isValidInput = (value, type) => {
  switch (type) {
    case inputTypes.text:
      return (typeof(value) === 'string' && value !== '');
    case inputTypes.number:
      return (!isNaN(value) && value >= 0);
    default:
      return true;
  }
};
