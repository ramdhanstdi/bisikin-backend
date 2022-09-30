const prisma = require('../helpers/prisma');

exports.craeteUsersModel = async (data) => {
  const results = {}
  const user = await prisma.users.create({
    data: {
      data
    }
  })
  results.user = user;

  const profile = await prisma.profile.create({
    data: {
      data,
      user_id: user.id
    }
  })
  results.profile = profile;
  return results;
}