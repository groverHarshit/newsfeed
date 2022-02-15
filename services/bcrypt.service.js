const bcrypt = require("bcryptjs");

const bcryptService = () => {
  const convertPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  };

  const comparePassword = (pw, hash) => bcrypt.compareSync(pw, hash);

  return {
    convertPassword,
    comparePassword,
  };
};

module.exports = bcryptService();
