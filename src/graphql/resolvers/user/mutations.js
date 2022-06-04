import { AuthenticationError } from 'apollo-server-express';
import UserModel from '../../../models/userModel';
import { createToken } from '../../utils/auth';

const userMutations = {
  registerFCMToken: async (_, args, context) => {
    const { token } = args;
    let userId = context.userId;

    const user = userId? await UserModel.getUser(userId): [];

    if (user.length == 0) { // Create user with token
      const newUser = await UserModel.newUser(token);
      userId = newUser[0].uuid;
    } else { // Update user token
      user.fcmToken = token;
      await UserModel.updateUser(user);
    }

    const accessToken = {
      token: createToken(userId)
    }

    return accessToken
  },
  updateUserData: async (_, args, context) => {
    const { name, studentId, email } = args;
    const userId = context.userId;

    if (userId == null)
      throw new AuthenticationError('You must be logged in to update your data.');

    const user = await UserModel.getUser(userId);

    if (user == null)
      throw new AuthenticationError('User not found.');

    if (name)
      user.name = name;

    if (studentId)
      user.studentId = studentId;

    if (email)
      user.email = email;

    const updatedUser = await UserModel.updateUser(user);

    delete updatedUser.uuid;
    delete updatedUser.createdAt;

    return updatedUser
  }
}

export default userMutations
