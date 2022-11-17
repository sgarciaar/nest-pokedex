import * as Joi from 'joi'

export const JoiValidationSchema = Joi.object({

    //configurar las validaciones de las variables de entorno con el package JOI yarn add joi
    MONGODB: Joi.required(),
    PORT:Joi.number().default(3005),
    DEFAULT_LIMIT:Joi.number().default(6)


})