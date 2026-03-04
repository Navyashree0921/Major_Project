// this is for schema validation at the server side using npm package joi ,the client side was handled by the forms,after this the mongooose will use its schema 

const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price:  Joi.number().min(0).required(),
        image:  Joi.string().allow("",null)
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required(),
});
