import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import ActiveAccountSvg from '../../../assets/ActiveAccount.svg';
import Button from '../../../common/components/button';
import { FullScreenLoader } from '../../../common/components/full-screen-loader';
import { useConfirmPasswordReset, useVerifyPasswordResetCode } from '../service';
import { ActiveAccountForm } from './models';

const AuthResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: confirmPasswordReset, isLoading: resetLoading } = useConfirmPasswordReset();
  const [searchParams] = useSearchParams();
  let oobCode: string = searchParams.get('oobCode') as string;

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required(t('validation-messages.password-is-required'))
      .test(
        'min-length',
        t('validation-messages.password-must-be-at-least-8-characters-long'),
        (value) => value.length >= 8,
      )
      .test(
        'max-length',
        t('validation-messages.password-cannot-be-longer-than-32-characters'),
        (value) => value.length <= 32,
      )
      .test('contains-upper', t('validation-messages.password-must-contain-at-least-one-uppercase-letter'), (value) =>
        /[A-Z]/.test(value),
      )
      .test('contains-lower', t('validation-messages.password-must-contain-at-least-one-lowercase-letter'), (value) =>
        /[a-z]/.test(value),
      )
      .test('contains-numeric', t('validation-messages.password-must-contain-at-least-one-numeric-digit'), (value) =>
        /\d/.test(value),
      )
      .test('contains-symbol', t('validation-messages.password-must-contain-at-least-one-special-symbol'), (value) =>
        /[@$!%*?&]/.test(value),
      ),
    retypePassword: Yup.string()
      .oneOf([Yup.ref('password')], t('validation-messages.passwords-must-match'))
      .required(t('validation-messages.retype-Password-is-required')),
  });

  const { register, handleSubmit, formState } = useForm<ActiveAccountForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;

  const { mutate: verifyPasswordResetCode, isLoading: verifyLoading } = useVerifyPasswordResetCode();

  useEffect(() => {
    verifyPasswordResetCode(oobCode, {
      onError: () => {
        navigate('/auth/login');
      },
    });
  }, [verifyPasswordResetCode, oobCode, navigate]);

  const onSubmit = useCallback(
    ({ password }: ActiveAccountForm) => {
      if (password) {
        confirmPasswordReset(
          { password },
          {
            onSuccess: () => {
              toast.success(t('password-success'));
              navigate('/auth/login');
            },
            onError: () => {
              toast.error(t('password-failed'));
            },
          },
        );
      }
    },
    [confirmPasswordReset, t, navigate],
  );

  if (verifyLoading) {
    return <FullScreenLoader />;
  }

  return (
    <div>
      <form action="" className="flex" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center h-screen w-1/2">
          <div className="w-96 flex flex-col gap-8">
            <div className=" flex flex-col gap-4 ">
              <h1 className="font-semibold text-3xl text-gray-500">{t('reset-password')}</h1>
              <span className="text-gray-500">{t('reset-password-description')}</span>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-gray-600">
                  {t('password')}
                </label>
                <input
                  type="password"
                  id="password"
                  className="border-solid border-gray-400 border-1 py-2 px-3 rounded-md"
                  placeholder={t('set-password')}
                  {...register('password')}
                />
                <span className="text-red-700">{errors.password?.message}</span>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-gray-600">
                  {t('retype-Password')}
                </label>
                <input
                  type="password"
                  id="retypePassword"
                  className="border-solid border-gray-400 border-1 py-2 px-3 rounded-md"
                  placeholder={t('re-type-password')}
                  {...register('retypePassword')}
                />
                <span className="text-red-700">{errors.retypePassword?.message}</span>
              </div>
            </div>
            <div className="w-full ">
              <Button type="submit" isLoading={resetLoading}>
                {t('continue')}
              </Button>
            </div>
          </div>
        </div>
        <div className="w-1/2 bg-blue-600 flex h-screen justify-center items-center">
          <div>
            <img src={ActiveAccountSvg} alt="" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthResetPassword;
