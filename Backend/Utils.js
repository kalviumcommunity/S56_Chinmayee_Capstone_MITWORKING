const filterSensitiveData = (user) => {
  const { password, email, ...safeData } = user._doc; // Add more fields as needed
  return safeData;
};

module.exports = filterSensitiveData;