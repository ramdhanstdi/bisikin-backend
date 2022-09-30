const response = require('./standardResponse');

const handleError = (msg,param, location='body') => {
  msg,
  param,
  location
}

const errorResponse = (err,res) => {
  if(err.code === '23505' && err.detail.includes('email')){
    const resErr = handleError('Email Already Use', 'email');
    return response(res, 'Error', resErr, null, 400);
  }
}

module.exports = errorResponse;