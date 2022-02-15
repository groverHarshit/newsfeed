const Joi = require("@hapi/joi");

function register(user) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    country_code: Joi.string().required(),
    contactNo: Joi.string().required(),
    date_of_birth: Joi.string().required(),
    language: Joi.string().required().valid("hindi", "english"),
    time_of_birth: Joi.string().required(),
    gender: Joi.string().required().valid("male", "female"),
    marital_status: Joi.string()
      .required()
      .valid("married", "un-married", "others"),
  });

  let result = schema.validate(user);
  return result;
}

module.exports = {
  register,
};
