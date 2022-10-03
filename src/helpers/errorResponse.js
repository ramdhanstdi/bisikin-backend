const response = require('./standardResponse');

const handleError = (msg,param, location='body') => [
  msg,
  param,
  location
]

const errorResponse = (err,res) => {
  if(err.code === 'P2002' && err.meta.target[0]==='username'){
    const resErr = handleError('Username Already Use', 'username');
    return response(res, 'Error', resErr, null, 400);
  }
  if(err.code === 'P2002' && err.meta.target[0]==='email'){
    const resErr = handleError('Email Already Use', 'email');
    return response(res, 'Error', resErr, null, 400);
  }
}

module.exports = errorResponse;