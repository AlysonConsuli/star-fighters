import Joi from "joi";

export const fighterSchema = Joi.object({
  firstUser: Joi.string().required(),
  secondUser: Joi.string().required(),
});
