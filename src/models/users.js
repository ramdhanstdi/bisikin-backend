const prisma = require('../helpers/prisma');

exports.createUsersModel = async (data) => {
  const results = {}
  try{
    const user = await prisma.users.create({
      data
    })
  
    const profile = await prisma.profile.create({
      data: {
        username: user.username,
        email: user.email,
        user_id: user.id,
      }
    })
    results.data = profile;
    return results;
  }
  catch(err){
    results.error = err
    return results;
  }
}

exports.getUserByEmail = async(email) => {
  const results = {};
  try{
    const user = await prisma.users.findMany({
      where: {
        email: email,
      }
    })
    results.data = user;
    return results;
  }
  catch(err){
    results.error = err;
    return results
  }
}