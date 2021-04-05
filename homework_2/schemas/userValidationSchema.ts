import Joi from 'joi';

const userSearchValidationSchema = Joi.object({
    q: Joi.string().required()
});

const userCreateValidationSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.number().integer().min(4).max(130).required()
});

export { userCreateValidationSchema, userSearchValidationSchema };
