export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePostcode = (postcode) => {
  const re = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
  return re.test(postcode);
};

export const validatePhone = (phone) => {
  const re = /^(?:(?:\+|00)?44|0)7\d{9}$/;
  return re.test(phone);
};