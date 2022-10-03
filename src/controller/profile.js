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
}