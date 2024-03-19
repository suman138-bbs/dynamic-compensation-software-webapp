import { yupResolver } from '@hookform/resolvers/yup';
import 'firebase/functions';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import Button from '../../../common/components/button';
import { TextInput } from '../../../common/components/text-input';
import { ClientForm } from '../models';
import { useCreateClient } from '../service';

const CreateClient = () => {
  const { t } = useTranslation('clients');
  const { mutate: createClient } = useCreateClient();

  const validationSchema = yup.object().shape({
    firstName: yup.string().required(t('required')),
    lastName: yup.string().required(t('required')),
    companyName: yup.string().required(t('required')),
    contactDetails: yup.string().required(t('required')),
    companyAddress: yup.string().required(t('required')),
    email: yup.string().email().required(t('required')),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ClientForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = useCallback(
    (data: ClientForm) => {
      createClient(data);
    },
    [createClient],
  );

  return (
    <div className="bg-white shadow-md rounded px-8 pt-10 pb-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 space-x-6 bg-bl">
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
            <TextInput type="text" label={t('create-client.email')} {...register('email')} error={errors.email} />
            <div>
              <Button type="submit">{t('create-now')}</Button>
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

export default CreateClient;
