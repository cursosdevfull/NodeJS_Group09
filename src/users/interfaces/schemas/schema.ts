import joi from "joi";

export const userSchemas = {
  INSERT: {
    body: joi.object({
      name: joi.string().required().messages({
        "string.base": "Nombre es obligatorio",
      }),
      lastname: joi.string().required(),
      password: joi.string().min(5).max(30).required(),
      age: joi.number().min(18).required(),
      email: joi.string().email().required(),
      roles: joi.array().items(joi.number().required()).required(),
      photo: joi.string().required(),
    }),
    query: joi.object({
      title: joi.string().required(),
    }),
  },
};
