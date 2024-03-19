import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import LogoSvg from '../../../assets/Logo.svg';
import Button from '../../../common/components/button';
import { useSignInWithEmailAndPassword } from '../service';
import { LoginForm } from './models';

const AuthLogin = () => {
  const { t } = useTranslation('authentication');
  const { mutate: signInWithEmailAndPassword, isLoading } = useSignInWithEmailAndPassword();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('error-messages.invalid-email-format'))
      .required(t('error-messages.user-name-is-required')),
    password: yup.string().required(t('error-messages.password-is-required')),
    remember: yup.bool().required(),
  });

  const { register, formState, handleSubmit } = useForm<LoginForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;

  const onSubmit = useCallback(
    (data: LoginForm) => {
      if (data) {
        signInWithEmailAndPassword(data, {
          onSuccess: () => {
            toast.success(t('sign-in-successfully'));
          },
          onError: () => {
            toast.error(t('invalid-email-or-password'));
          },
        });
      }
    },
    [signInWithEmailAndPassword, t],
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex" noValidate>
        <div className="flex items-center justify-center h-screen w-1/2">
          <div className="w-96 flex flex-col gap-8">
            <div className=" ">
              <h1 className="font-semibold text-3xl text-gray-500">{t('Login')}</h1>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="text-gray-600">
                  {t('user-name')}
                </label>
                <input
                  type="text"
                  id="username"
                  className="border-solid border-gray-400 border-1 py-2 px-3 rounded-md"
                  placeholder="Enter your username"
                  {...register('email')}
                />
                <span className="text-red-700">{errors.email?.message}</span>
              </div>
              <div className="flex flex-col gap-2 ">
                <label htmlFor="password" className="text-gray-600">
                  {t('password')}
                </label>
                <input
                  type="password"
                  id="password"
                  className="border-solid border-gray-400 border-1 py-2 px-3 rounded-md"
                  placeholder="Enter your password"
                  {...register('password')}
                />
                <span className="text-red-700">{errors.password?.message}</span>
              </div>
              <div className="flex gap-2 items-center">
                <input type="checkbox" id="remember" {...register('remember')} />
                <label htmlFor="remember" className="text-gray-600">
                  {t('remember-me')}
                </label>
              </div>
            </div>
            <div className="w-full ">
              <Button type="submit" isLoading={isLoading}>
                {t('login')}
              </Button>
            </div>
            <div className="w-full ">
              <Link to="/auth/forgot-password">
                <p className="text-blue-500 text-lg cursor-pointer inline-block">{t('forgot-password')}</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-1/2 bg-blue-700  flex h-screen justify-center items-center ">
          <div className="relative ">
            <p className="text-white absolute left-52 top-[15.5em] ">FIRST MARINE</p>
            <img src={LogoSvg} alt="" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthLogin;
