const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');
const profileModels = require('../models/profile');

exports.editProfile = async(req, res) => {
  try {
    const results = await profileModels.editProfileModel(req.body,req.authUser.id);
    if(results.error){
      return errorResponse(results.error,res)
    }
    return response(res, 'Profile Edited', results.data);
  } 
  catch (err) {
    return errorResponse(err,res)
  }
};

exports.getProfile = async(req, res) => {
  try {
    const results = await profileModels.getProfileModel(req.authUser.id);
    if(results.error){
      return errorResponse(results.error,res);
    }
    return response(res, 'Profile Show', results.data[0]);
  } 
  catch (err) {
    return errorResponse(err,res);
  }
};