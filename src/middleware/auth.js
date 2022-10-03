const jwt = require('jsonwebtoken');
const response = require('../helpers/standardResponse');

const auth = (req, res, next) => {
  if(req.headers.authorization){
    const auth = req.headers.authorization;
    const prefix = 'Bearer';
    if(auth.startsWith(prefix)){
      const token = auth.slice(prefix.length+1, auth.length);
      try{
        const result = jwt.verify(token,process.env.APP_KEY || 'secretkey');
        req.authUser = result;
        next
      }
      catch(err){
        return response(res, 'Token Expired', null, null, 401);
      }
    }
  } else {
    return response(res, 'Token Expired', null, null, 401);
  }
}

module.exports = auth;