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
};