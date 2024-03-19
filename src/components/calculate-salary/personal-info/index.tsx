import { FieldError, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TextInput } from '../../../common/components/text-input';

const PersonalInfo = () => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex grow flex-col gap-y-6 overflow-auto ">
      <div className="grid grid-cols-2 space-x-6">
        <TextInput label={t('name') + ' *'} {...register('name')} error={errors.name as FieldError} />
        <TextInput label={t('email') + '*'} {...register('email')} error={errors.email as FieldError} />
      </div>
      <div className="grid grid-cols-2 space-x-6">
        <TextInput label={t('age') + ' *'} {...register('age')} error={errors.age as FieldError} />
        <TextInput
          type="text"
          label={t('education') + ' *'}
          {...register('education')}
          error={errors.education as FieldError}
        />
      </div>
      <div className="grid grid-cols-2 space-x-6">
        <TextInput
          label={t('contact-num') + ' *'}
          {...register('contactNumber')}
          prefix="+91"
          error={errors.contactNumber as FieldError}
        />
        <TextInput label={t('marks') + ' *'} {...register('marks')} error={errors.marks as FieldError} />
      </div>
    </div>
  );
};

export default PersonalInfo;
