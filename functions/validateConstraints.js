module.exports = {
  from: {
    email: true
  },
  confirmPassword: {
    equality: 'password',
    length: {
      minimum: 8
    }
  }
};
