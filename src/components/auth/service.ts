import {
  User,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  verifyPasswordResetCode,
} from '@firebase/auth';
import { UserCredential, sendPasswordResetEmail } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useMutation, useQuery } from 'react-query';

import { FirebaseConfigService } from '../../common/services/firebase-config-service';

const functions = getFunctions();

export class AuthenticationService {
  static async signInWithEmailPassword(email: string, password: string, remember: boolean): Promise<UserCredential> {
    if (remember) {
      await setPersistence(FirebaseConfigService.auth, browserSessionPersistence);
    }
    return signInWithEmailAndPassword(FirebaseConfigService.auth, email, password);
  }

  static async logout(): Promise<void> {
    await signOut(FirebaseConfigService.auth);
  }

  static getCurrentUser(): User | null {
    return FirebaseConfigService.auth.currentUser;
  }

  static async sendEmailToResetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(FirebaseConfigService.auth, email);
  }

  static async resetPassword(password: string) {
    const setPassword = httpsCallable(functions, 'reset_password');
    return setPassword(password);
  }

  static async verifyCodeToResetPassword(code: string): Promise<string> {
    return await verifyPasswordResetCode(FirebaseConfigService.auth, code);
  }

  static async activateAccount(referenceId: string, password: string) {
    const activate = httpsCallable(functions, 'activate_account');
    return activate({ referenceId, password });
  }
}

export const AUTHENTICATION_QUERY_KEYS = {
  GET_CURRENT_USER: 'getCurrentUser',
};

export const useSignInWithEmailAndPassword = () =>
  useMutation((payload: { email: string; password: string; remember: boolean }) =>
    AuthenticationService.signInWithEmailPassword(payload.email, payload.password, payload.remember),
  );

export const useLogout = () => useMutation(AuthenticationService.logout);

export const useGetCurrentUser = () =>
  useQuery(AUTHENTICATION_QUERY_KEYS.GET_CURRENT_USER, AuthenticationService.getCurrentUser);

export const useSendEmailToResetPassword = () =>
  useMutation((payload: { email: string }) => AuthenticationService.sendEmailToResetPassword(payload.email));

export const useConfirmPasswordReset = () => {
  return useMutation((payload: { password: string }) => {
    return AuthenticationService.resetPassword(payload.password);
  });
};

export const useVerifyPasswordResetCode = () => {
  return useMutation((code: string) => {
    return AuthenticationService.verifyCodeToResetPassword(code);
  });
};

export const useActivateAccount = () => {
  return useMutation((payload: { referenceId: string; password: string }) => {
    return AuthenticationService.activateAccount(payload.referenceId, payload.password);
  });
};
