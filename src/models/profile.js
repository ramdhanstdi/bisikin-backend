const prisma = require('../helpers/prisma');

exports.getProfileModel = async (id) => {
  const results = {};
  try{
    const profile = await prisma.profile.findMany({
      where: {
        user_id: id,
      }
    })
    results.data = profile;
    return results;
  }
  catch(err){
    results.error = err;
    return results;
  }
}

exports.editProfileModel = async (data,id) => {
  const results = {};
  try {
    const profile = await prisma.profile.update({
      where: {
        user_id: id
      },
      data
    });
    const user = await prisma.users.update({
      data: {
        email: profile.email,
        username: profile.username
      }
    })
    results.data = profile;
    return results;
  } catch (err) {
    results.error = err;
    return results;
  }
}