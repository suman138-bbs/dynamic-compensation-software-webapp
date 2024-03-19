import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import ForgotSvg from '../../../assets/Forgot.svg';
import Button from '../../../common/components/button';
import { useSendEmailToResetPassword } from '../service';
import { ForgotPasswordForm } from './models';

const AuthForgotPassword = () => {
  const { t } = useTranslation('authentication');
  const { mutate: sendEmailToResetPassword, isLoading } = useSendEmailToResetPassword();

  const validationSchema = yup.object({
    email: yup.string().email(t('error-messages.invalid-email-format')).required(t('error-messages.required-email')),
  });

  const { register, formState, handleSubmit } = useForm<ForgotPasswordForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    resolver: yupResolver(validationSchema),
  });
  const { errors } = formState;

  const onSubmit = useCallback(
    (data: ForgotPasswordForm) => {
      if (data) {
        sendEmailToResetPassword(data, {
          onSuccess: () => {
            toast.success(t('reset-password-link-sent-successfully'));
          },
          onError: () => {
            toast.error(t('email-not-found'));
          },
        });
      }
    },
    [sendEmailToResetPassword, t],
  );

  return (
    <div>
      <form className="flex" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center h-screen w-1/2">
          <div className="w-96 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="font-semibold text-3xl text-gray-500">{t('forgot-password')}</h1>
              <p className="text-gray-500">{t('forgot-password-description')}</p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-gray-600">
                  {t('email-address')}
                </label>
                <input
                  type="email"
                  id="email"
                  className="border-solid border-gray-400 border-1 py-2 px-3 rounded-md"
                  placeholder="Enter your email address"
                  {...register('email')}
                />
                <span className="text-red-700">{errors.email?.message}</span>
              </div>
            </div>
            <div className="w-full">
              <Button type="submit" isLoading={isLoading}>
                {t('reset-password')}
              </Button>
            </div>
            <div className="w-full">
              <Link to="/auth/login">
                <p className="text-blue-500 text-lg cursor-pointer inline-block"> {t('sign-in')}</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-1/2 bg-blue-700 flex h-screen justify-center items-center">
          <div>
            <img src={ForgotSvg} alt="" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthForgotPassword;
