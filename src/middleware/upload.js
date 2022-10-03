const upload = require('../helpers/upload').array('files');
const response = require('../helpers/standardResponse');

const uploadFile = (req, res, next) => {
  upload(req, res, (err)=>{
    if(err){
      return response (res, `Failed Upload ${err.message}`, null, null, 400);
    }
    next();
  });
};

module.exports = uploadFile;