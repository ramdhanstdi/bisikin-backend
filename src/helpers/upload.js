const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');
const max = process.env.MAX_SIZE;

//location file saved
const storage = new CloudinaryStorage({
  cloudinary:cloudinary,
  params: {
    folder: 'bisikin',
    format: async(req,file)=>{
      const ext = file.mimetype.split('/')[1];
      return ext;
    },
    public_id: () => new Date().getTime()+Math.random(1000)
  }
});

//upload
const upload = multer({
  storage,
  limits : {
    fileSize: max * 1000*1000
  },
  fileFilter: (req,file,cb) => {
    const allowExt = ['image/jpg','image/jpeg','image/png','image/webp'];
    if(allowExt.includes(files.mimetype)){
      cb(null, true);
    } else {
      const error = new Error('File not supported');
      cb(error, false);
    }
  }
});

module.exports = upload;