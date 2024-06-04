import Joi from "joi";
import validation from "./validation";

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(256).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{6,}$/
      )
    )
    .messages({
      "string.pattern.base": "the password should be...",
      "string.empty":
        "password must be filled with something that you will not forget",
    })
    .min(7)
    .max(20)
    .required(),
  gender: Joi.string().min(1).allow(""),
  month: Joi.string().min(1).allow(""),
  date: Joi.string().min(1).allow(""),
  year: Joi.string().min(1).allow(""),
});

const validateRegister = (inputToCheck) =>
  validation(registerSchema, inputToCheck);

export { validateRegister };
