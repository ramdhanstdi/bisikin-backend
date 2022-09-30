const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');
const userModels = require('../models/users');

exports.createUsers = async (req,res) => {
  try{
    const results = await userModels.craeteUsersModel(req.body);
    return response(res,'Registes Success', results)
  }
  catch(e){
    return errorResponse(err, res)
  }
}