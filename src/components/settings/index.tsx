import { CameraIcon } from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { getAuth } from 'firebase/auth';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import AvatarIcon from '../../assets/avatar.svg';
import { TextInput } from '../../common/components/text-input';
import { UpdateForm } from './models';
import { useUpdateUser } from './service';

const Settings = () => {
  const { t } = useTranslation();
  const [profileImg, setProfileImg] = useState<string | ArrayBuffer | File | null>('');
  const [uid, setUid] = useState<string>();
  const { mutate: updateUser } = useUpdateUser();

  const updateValidationSchema = Yup.object().shape({
    firstName: Yup.string().required(t('error-messages.first-name-is-required')),
    lastName: Yup.string().required(t('error-messages.last-name-is-required')),
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
    email: Yup.string()
      .email(t('error-messages.invalid-email-format'))
      .required(t('error-messages.user-name-is-required')),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<UpdateForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    resolver: yupResolver(updateValidationSchema),
  });

  const inputImageRef = useRef<HTMLInputElement | null>(null);

  const handlePickImage = () => {
    inputImageRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];
    if (fileUploaded) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfileImg(reader.result);
      };

      reader.readAsDataURL(fileUploaded);
    }
  };

  const onSubmit = useCallback(
    (updatedData: UpdateForm) => {
      updateUser({ ...updatedData, photo: profileImg as File, uid: uid as string });
    },
    [updateUser, profileImg, uid],
  );

  useEffect(() => {
    const { currentUser } = getAuth();
    if (currentUser) {
      setUid(currentUser.uid);

      setValue('email', currentUser.email as string);
      setProfileImg(currentUser.photoURL);
    }
  }, [setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex  flex-col gap-8 bg-white shadow-md px-24 py-8  rounded ">
          <div className="h-32 w-32 relative">
            <img src={(profileImg as string) || AvatarIcon} alt="" className="w-full h-full rounded-full" />
            <div
              className="h-10 w-10 rounded-full bg-slate-50 flex justify-center items-center absolute left-12 top-28"
              onClick={handlePickImage}
            >
              <CameraIcon className="h-6 w-6 cursor-pointer " />
            </div>
            <input
              type="file"
              name="photo"
              id="photo"
              ref={inputImageRef}
              onChange={handleChange}
              className="hidden"
              accept="image/*"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <TextInput
              label={t('profile-update.first-name')}
              {...register('firstName')}
              wrapperClassName="w-96"
              error={errors.firstName}
            />
            <TextInput label={t('profile-update.last-name')} {...register('lastName')} error={errors.lastName} />
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <TextInput label={t('profile-update.user-name')} {...register('email')} disabled />
            <TextInput
              type="password"
              label={t('profile-update.password')}
              {...register('password')}
              error={errors.password}
            />
          </div>
          <div className="">
            <button type="submit" className="w-32 h-10 py-2 rounded-lg  text-blue-600 border border-blue-600">
              {t('update')}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Settings;
