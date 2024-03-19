import { FieldError, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { RadioInput } from '../../../common/components/radio';
import { SingleSelectInput } from '../../../common/components/single-select-input';
import { TextInput } from '../../../common/components/text-input';

const PersonalFactor = () => {
  const { t } = useTranslation();

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <div className="flex grow flex-col gap-y-6 overflow-auto ">
      <div className="grid grid-cols-2 space-x-6">
        <SingleSelectInput
          name="rank"
          data={options}
          label={t('rank') + ' *'}
          control={control}
          error={errors.rank?.message as FieldError}
        />
        <TextInput
          label={t('experience-in-rank') + ' *'}
          {...register('experienceInRank')}
          error={errors.experienceInRank?.message as FieldError}
        />
      </div>
      <div className="grid grid-cols-2 space-x-6">
        <TextInput
          label={t('experience-in-vessel') + ' *'}
          {...register('experienceInVessel')}
          error={errors.experienceInVessel?.message as FieldError}
        />
        <TextInput
          label={t('mistakes-previous') + ' *'}
          type="text"
          {...register('mistakesPrevious')}
          error={errors.mistakesPrevious?.message as FieldError}
        />
      </div>
      <div className="grid grid-cols-2 space-x-6">
        <TextInput
          label={t('higher-certificate') + ' *'}
          type="text"
          {...register('higherCertificate')}
          error={errors.higherCertificate?.message as FieldError}
        />
        <TextInput
          label={t('average-of-appraisals') + ' *'}
          {...register('averageOfAppraisala')}
          error={errors.averageOfAppraisala?.message as FieldError}
        />
      </div>
      <div className="grid grid-cols-2 space-x-6">
        <div className="flex flex-col">
          <label className="mb-1 block text-sm font-medium text-gray-700">{t('loyalty') + ' *'}</label>
          <div className="flex pl-1">
            <div className="flex items-center">
              <RadioInput
                label={t('yes')}
                id="yes"
                value="yes"
                {...register('loyalty')}
                error={errors.loyalty?.message as FieldError}
              />
            </div>
            <div className="flex items-center">
              <RadioInput
                className="ml-2"
                label={t('no')}
                id="no"
                value="no"
                {...register('loyalty')}
                error={errors.loyalty?.message as FieldError}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 block text-sm font-medium text-gray-700">{t('eto-fitter') + ' *'}</label>
          <div className="flex pl-1">
            <div className="flex items-center">
              <RadioInput
                label={t('yes')}
                id="yes"
                value="yes"
                {...register('etoFilter')}
                error={errors.etoFilter?.message as FieldError}
              />
            </div>
            <div className="flex items-center">
              <RadioInput
                className="ml-2"
                label={t('no')}
                id="no"
                value="no"
                {...register('etoFilter')}
                error={errors.etoFilter?.message as FieldError}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalFactor;
