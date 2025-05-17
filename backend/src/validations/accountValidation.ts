import Joi from 'joi';

const AccountValidation = {
  transferMoney: {
    body: Joi.object().keys({
      to: Joi.string().required().messages({
        'string.empty': 'Recipient userId is required',
        'any.required': 'Recipient userId is required'
      }),
      amount: Joi.number().positive().required().messages({
        'number.base': 'Amount must be a number',
        'number.positive': 'Amount must be greater than zero',
        'any.required': 'Amount is required'
      })
    })
  }
};

export default AccountValidation;
