const mongoose = require('mongoose');
const Models = require('../models/Models');
const bcryptjs = require('bcryptjs');

async function updateAdmin(request, response) {
  const _id = request.params.id;
  const tokenAdminId = request.userId;
  const { password, avatar, ...inputs } = request.body;

  if (_id !== tokenAdminId) {
    return response
      .status(403)
      .json({ message: 'Not Authorized!', error: true });
  }

  let updateNewPassword = null;
  try {
    if (password) {
      updateNewPassword = await bcryptjs.hash(password, 10);
    }
    const updateAdmin = await Models.Admin.findByIdAndUpdate(
      _id,
      {
        ...inputs,
        ...(updateNewPassword && { password: updateNewPassword }),
        ...(avatar && { avatar }),
      },
      { new: true },
    );

    const { password: adminPassword, ...admin } = updateAdmin.toObject();

    response
      .status(200)
      .json({ message: 'Admin update success', admin, success: true });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: 'Failed to update admin!', error: true });
  }
}

module.exports = { updateAdmin };
