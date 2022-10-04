const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');
const userModels = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUsers = async (req,res) => {
  try{
    const results = await userModels.createUsersModel(req.body);
    if(results.error){
      return errorResponse(results.error,res);
    }

    return response(res,'Register Success')
  }
  catch(err){
    return errorResponse(err, res)
  }
}

exports.getUser = async (req,res) => {
  try {
    const results = await userModels.getUserByEmail(req.body.email);
    if(results.error){
      return errorResponse(results.error,res);
    }
    if(results.data.length < 1){
      return response(res, 'Wrong Email or Password', null, null, 400);
    }
    const user = results.data
    bcrypt.compare(req.body.password,user[0].password)
      .then((cpres)=>{
        if(cpres){
          const token = jwt.sign({id: user[0].id}, process.env.APP_KEY || 'k4Aul4h');
          return response(res, 'Login Success', {id: user[0].id, token})
        }
        return response(res, 'Wrong Email or Password', null, null, 400)
      })
      .catch((e)=>{
        return response(res, 'Wrong Email or Password', null, null, 400)
      })
  } catch (err) {
    return errorResponse(err,res)
  }
}