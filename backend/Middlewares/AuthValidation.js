const Joi = require('joi');

const signupValidation = (req,res,next)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(12).required(),
        phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
        dob: Joi.date().less('now').required(),
        gender: Joi.string().valid('male', 'female').required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
            .json({message: "BAd request", error});
    }
    next();
};

const loginValidation = (req,res,next)=>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(12).required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
            .json({message: "BAd request", error});
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation
}