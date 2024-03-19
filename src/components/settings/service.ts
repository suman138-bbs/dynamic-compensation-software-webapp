import { getFunctions, httpsCallable } from 'firebase/functions';
import { useMutation } from 'react-query';

import { UpdateUser } from './models';

const functions = getFunctions();

export class UserService {
  static async updateUser(data: UpdateUser) {
    const updateUser = httpsCallable(functions, 'update_user');
    return updateUser(data);
  }
}

export const useUpdateUser = () => {
  return useMutation((payload: UpdateUser) => {
    return UserService.updateUser(payload);
  });
};
