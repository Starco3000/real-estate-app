const Models = require('../models/Models');
const bcryptjs = require('bcryptjs');

async function getUsers(request, response) {
  try {
    const users = await Models.User.find();
    response.status(200).json({ users, success: true });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Failed to get users!', error: true });
  }
}

async function getUser(request, response) {
  const _id = request.params.id;
  try {
    const user = await Models.User.findById(_id);
    response.status(200).json({ user, success: true });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Failed to get user!', error: true });
  }
}

async function updateUser(request, response) {
  const _id = request.params.id;
  // console.log('id', id);
  const tokenUserId = request.userId;
  const { password, avatar, ...inputs } = request.body;

  if (_id !== tokenUserId) {
    return response
      .status(403)
      .json({ message: 'Not Authorized!', error: true });
  }

  let updateNewPassword = null;
  try {
    if (password) {
      updateNewPassword = await bcryptjs.hash(password, 10);
    }
    const updateUser = await Models.User.findByIdAndUpdate(
      _id,
      {
        ...inputs,
        ...(updateNewPassword && { password: updateNewPassword }),
        ...(avatar && { avatar }),
      },
      { new: true },
    );

    const { password: userPassword, ...user } = updateUser.toObject();

    response
      .status(200)
      .json({ message: 'User update success', user, success: true });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: 'Failed to update user!', error: true });
  }
}

async function deleteUser(request, response) {
  const _id = request.params.id;
  const tokenUserId = request.userId;
  if (_id !== tokenUserId) {
    return response
      .status(403)
      .json({ message: 'Not Authorized!', error: true });
  }
  try {
    await Models.User.findByIdAndDelete(_id);
    response.status(200).json({ message: 'User deleted', success: true });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: 'Failed to delete user!', error: true });
  }
}

module.exports = { getUsers, getUser, updateUser, deleteUser };
