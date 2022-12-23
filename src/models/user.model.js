import joi from "joi";

export const userSchema = joi.object({
    name: joi.string().required().min(1),
    email: joi.string().email().required(),
    password: joi.string().required().min(4),
    confirmPassword: joi.any().valid(joi.ref('password')).required()
});