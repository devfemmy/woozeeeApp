export const verifyEmail = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (re.test(email)) {
    return {
      status: 'success',
      caption: 'Email format is valid',
    };
  }
  return {
    status: 'danger',
    caption: 'Email format is invalid',
  };
};

export const verifyNoEmpty = (term, title) => {
  const re = /\S+/;

  if (re.test(term)) {
    return {
      status: 'success',
      caption: `${title} is valid`,
    };
  }
  return {
    status: 'danger',
    caption: `${title} cannot be empty`,
  };
};

export const verifySearch = (term) => {
  const re = /\S+/;

  if (re.test(term)) {
    return {
      status: 'success',
    };
  }
  return {
    status: 'danger',
  };
};
