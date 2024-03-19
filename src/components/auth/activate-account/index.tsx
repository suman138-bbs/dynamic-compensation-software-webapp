import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { useNavigate, useSearchParams } from 'react-router-dom';
import ActiveAccountSvg from '../../../assets/ActiveAccount.svg';
import Button from '../../../common/components/button';
import { useActivateAccount } from '../service';
import { ActiveAccountForm } from './models';

const AuthAccountActivation = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();

  const referenceId: string | null = searchParams.get('referenceId');
  const navigate = useNavigate();

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

  const { mutate: activateAccount } = useActivateAccount();

  const { errors } = formState;

  if (!referenceId) {
    navigate('/auth/login');
  }

  const onSubmit = useCallback(
    ({ password }: ActiveAccountForm) => {
      if (referenceId) {
        activateAccount(
          { referenceId, password },
          {
            onSuccess: () => {
              navigate('/auth/login');
            },
          },
        );
      }
    },
    [referenceId, activateAccount, navigate],
  );

  return (
    <div>
      <form action="" className="flex" onClick={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center h-screen w-1/2">
          <div className="w-96 flex flex-col gap-8">
            <div className=" flex flex-col gap-4 ">
              <h1 className="font-semibold text-3xl text-gray-500">{t('awesome')}</h1>
              <span className="text-gray-500">{t('profile-activated-description')}</span>
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
                  placeholder="Set your password"
                  {...register('password')}
                />
                <p className="text-red-700">{errors.password?.message}</p>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-gray-600">
                  {t('retype-Password')}
                </label>
                <input
                  type="password"
                  id="retypePassword"
                  className="border-solid border-gray-400 border-1 py-2 px-3 rounded-md"
                  placeholder="Retype your password"
                  {...register('retypePassword')}
                />
                <p className="text-red-700">{errors.retypePassword?.message}</p>
              </div>
            </div>
            <div className="w-full ">
              <Button type="submit">{t('continue')}</Button>
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

export default AuthAccountActivation;
