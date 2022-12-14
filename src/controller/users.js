const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');
const userModels = require('../models/users');

exports.createUsers = async (req,res) => {
  try{
    const results = await userModels.createUsersModel(req.body);
    if(results.error){
      return errorResponse(results.error,res);
    }

    return response(res,'Create Account Success')
  }
  catch(err){
    return errorResponse(err, res)
  }
};