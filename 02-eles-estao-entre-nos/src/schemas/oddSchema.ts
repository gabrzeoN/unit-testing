import Joi from 'joi';

const oddSchema = Joi.object({
  number: Joi.number().required(),
});

export default oddSchema;
