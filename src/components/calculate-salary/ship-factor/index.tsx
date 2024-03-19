import { FieldError, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { RadioInput } from '../../../common/components/radio';
import { SingleSelectInput } from '../../../common/components/single-select-input';
import { TextInput } from '../../../common/components/text-input';

const ShipFactor = () => {
  const { t } = useTranslation();
  const {
    control,
    register,
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
          name="shipType"
          data={options}
          control={control}
          label={t('ship-type') + ' *'}
          error={errors.shipType?.message as FieldError}
        />
        <TextInput
          label={t('ship-age') + ' *'}
          {...register('shipAge')}
          error={errors.shipAge?.message as FieldError}
        />
      </div>
      <div className="grid grid-cols-2 space-x-6">
        <TextInput
          label={t('ship-route') + ' *'}
          type="text"
          {...register('shipRoute')}
          error={errors.shipRoute?.message as FieldError}
        />
        <TextInput
          label={t('bridge-ecdis') + ' *'}
          type="text"
          {...register('bridgeEcdis')}
          error={errors.bridgeEcdis?.message as FieldError}
        />
      </div>
      <div className="grid grid-cols-2 space-x-6">
        <TextInput
          label={t('average-rest') + ' *'}
          {...register('averageRest')}
          error={errors.averageRest?.message as FieldError}
        />
        <TextInput
          label={t('average-port-stay') + ' *'}
          {...register('averagePortStay')}
          error={errors.averagePortStay?.message as FieldError}
        />
      </div>

      <div className="grid grid-cols-2 space-x-6">
        <TextInput
          label={t('vetting-done') + ' *'}
          type="text"
          {...register('vettingDone')}
          error={errors.vettingDone?.message as FieldError}
        />
        <TextInput
          label={t('right-ship') + ' *'}
          type="text"
          {...register('rightShip')}
          error={errors.rightShip?.message as FieldError}
        />
      </div>

      <div className="grid grid-cols-2 space-x-6">
        <TextInput
          label={t('psc-defic') + ' *'}
          type="text"
          {...register('pscDefic')}
          error={errors.pscDefic?.message as FieldError}
        />
        <TextInput
          label={t('ums-mann') + ' *'}
          type="text"
          {...register('umsMann')}
          error={errors.umsMann?.message as FieldError}
        />
      </div>
      <div className="grid grid-cols-2 space-x-6">
        <div className="flex flex-col">
          <label className="mb-1 block text-sm font-medium text-gray-700">{t('route-us') + ' *'}</label>
          <div className="flex pl-1">
            <div className="flex items-center">
              <RadioInput
                label={t('yes')}
                id="yes"
                {...register('routeUs')}
                value="yes"
                error={errors.routeUs?.message as FieldError}
              />
            </div>
            <div className="flex items-center">
              <RadioInput
                className="ml-2"
                label={t('no')}
                id="no"
                {...register('routeUs')}
                value="no"
                error={errors.routeUs?.message as FieldError}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 block text-sm font-medium text-gray-700">{t('dry-docking') + ' *'}</label>
          <div className="flex pl-1">
            <div className="flex items-center">
              <RadioInput
                label={t('yes')}
                id="yes"
                {...register('dryDocking')}
                value="yes"
                error={errors.dryDocking?.message as FieldError}
              />
            </div>
            <div className="flex items-center">
              <RadioInput
                className="ml-2"
                label={t('no')}
                id="no"
                {...register('dryDocking')}
                value="no"
                error={errors.dryDocking?.message as FieldError}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipFactor;
