import { CameraIcon } from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import 'firebase/functions';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';

import { toast } from 'react-toastify';
import AvatarIcon from '../../../assets/avatar.svg';
import Button from '../../../common/components/button';
import { TextInput } from '../../../common/components/text-input';
import { ClientDto, ClientForm } from '../models';
import { useUpdateClient } from '../service';

const EditClient = () => {
  const { t } = useTranslation('clients');

  const [profileImg, setProfileImg] = useState<string | ArrayBuffer | null>('');
  const validationSchema = yup.object().shape({
    firstName: yup.string().required(t('required')),
    lastName: yup.string().required(t('required')),
    companyName: yup.string().required(t('required')),
    contactDetails: yup.string().required(t('required')),
    companyAddress: yup.string().required(t('required')),
    email: yup.string().email().required(t('required')),
  });
  const { state } = useLocation();
  const clientData = useRef<ClientDto & ClientForm>(state?.clientData);

  const { isLoading, mutate: updateClient } = useUpdateClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ClientForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = useCallback(
    (data: ClientForm) => {
      updateClient(
        {
          id: clientData.current?.id,
          ...data,
        },
        {
          onSuccess: () => {
            toast.success(t('update-success'));
          },
          onError: () => {
            toast.error(t('update-failer'));
          },
        },
      );
    },
    [t, updateClient],
  );

  useEffect(() => {
    reset({
      firstName: clientData.current?.firstName,
      lastName: clientData.current?.lastName,
      email: clientData.current?.email,
      companyAddress: clientData.current?.companyAddress,
      companyName: clientData.current?.companyName,
      contactDetails: clientData.current?.contactDetails,
    });
  }, [reset]);

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

  return (
    <div className="bg-white shadow-md rounded px-8 pt-10 pb-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-32 w-32 relative mb-10">
          <img src={(profileImg as string) || AvatarIcon} alt="" className="w-full h-full rounded-full" />
          <div
            className="h-10 w-10 rounded-full bg-slate-50 flex justify-center items-center absolute left-12 top-28"
            onClick={handlePickImage}
          >
            <CameraIcon className="h-6 w-6 cursor-pointer " />
          </div>
          <input
            type="file"
            name=""
            id=""
            ref={inputImageRef}
            onChange={handleChange}
            className="hidden"
            accept="image/*"
          />
        </div>
        <div className="grid grid-cols-2 space-x-6">
          <div className="flex flex-col gap-8">
            <TextInput
              type="text"
              label={t('create-client.first-name')}
              {...register('firstName')}
              error={errors.firstName}
            />
            <TextInput
              type="text"
              label={t('create-client.company-name')}
              {...register('companyName')}
              error={errors.companyName}
            />
            <TextInput
              type="text"
              label={t('create-client.contact-details')}
              {...register('contactDetails')}
              error={errors.contactDetails}
            />
            <TextInput type="text" label={t('create-client.email')} {...register('email')} disabled />
            <div>
              <Button type="submit" isLoading={isLoading}>
                {t('update')}
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <TextInput
              type="text"
              label={t('create-client.last-name')}
              {...register('lastName')}
              error={errors.lastName}
            />
            <TextInput
              type="text"
              label={t('create-client.company-address')}
              {...register('companyAddress')}
              error={errors.companyAddress}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditClient;
