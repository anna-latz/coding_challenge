const Joi = require('@hapi/joi');

const firstName = Joi.string().min(2).max(20).pattern(/^[a-zA-Z'\- ]{3,20}$/).required().messages({
  'string.pattern.base': `Your name can only contain lower, uppercase letters, apostrophes and hyphens`,
  'string.empty': `Name cannot be an empty field`,
  'string.min': `Name should have a minimum length of {#limit}`,
  'string.max': `Name should have a maximum length of {#limit}`,
});

const lastName = Joi.string().min(2).max(20).pattern(/^[a-zA-Z'\- ]{3,20}$/).required().messages({
  'string.pattern.base': `Your name can only contain lower, uppercase letters, apostrophes and hyphens`,
  'string.empty': `Name cannot be an empty field`,
  'string.min': `Name should have a minimum length of {#limit}`,
  'string.max': `Name should have a maximum length of {#limit}`,
});

const longitude = Joi.number().min(-180).max(180).required().messages({
  'string.empty': `Longitude cannot be an empty field`,
  'string.min': `Longitude should have a minimum number of {#limit}`,
  'string.max': `Longitude should have a maximum number of {#limit}`,
});

const latitude = Joi.number().min(-90).max(90).required().messages({
  'string.empty': `Name cannot be an empty field`,
  'string.min': `Password should have a minimum length of {#limit}`,
  'string.max': `Password should have a maximum length of {#limit}`,
});

const uuid = Joi.string().min(36).max(36).required().messages({
  'string.empty': `Name cannot be an empty field`,
  'string.min': `Name should have a minimum length of {#limit}`,
  'string.max': `Name should have a maximum length of {#limit}`,
});

exports.uuidSchema = Joi.object({ uuid }); 

exports.locationSchema = Joi.object({ longitude, latitude }); 

exports.registerSchema = Joi.object({ uuid, firstName, lastName });