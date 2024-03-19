import { useCallback, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { salaryFormType } from './models';
import PersonalFactor from './personal-factor';
import PersonalInfo from './personal-info';
import ShipFactor from './ship-factor';

const CalculateSalary = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);

  const validationSchema = yup.object().shape({
    name: yup.string().required(t('required')),
    email: yup.string().email().required(t('required')),
    age: yup.string().required(t('required')),
    education: yup.string().required(t('required')),
    contactNumber: yup.string().required(t('required')),
    marks: yup.string().required(t('required')),
    experienceInRank: yup.string().required(t('required')),
    experienceInVessel: yup.string().required(t('required')),
    mistakesPrevious: yup.string().required(t('required')),
    higherCertificate: yup.string().required(t('required')),
    averageOfAppraisala: yup.string().required(t('required')),
    loyalty: yup.string().required(t('required')),
    etoFilter: yup.string().required(t('required')),
    shipType: yup.string().required(t('required')),
    rank: yup.string().required(t('required')),
    shipAge: yup.string().required(t('required')),
    shipRoute: yup.string().required(t('required')),
    bridgeEcdis: yup.string().required(t('required')),
    averageRest: yup.string().required(t('required')),
    averagePortStay: yup.string().required(t('required')),
    vettingDone: yup.string().required(t('required')),
    rightShip: yup.string().required(t('required')),
    pscDefic: yup.string().required(t('required')),
    umsMann: yup.string().required(t('required')),
    routeUs: yup.string().required(t('required')),
    dryDocking: yup.string().required(t('required')),
  });
  const methods = useForm<salaryFormType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const handleNextStep = () => {
    setCurrentStep(currentStep < 3 ? currentStep + 1 : currentStep);
  };
  const handlePrevStep = () => {
    setCurrentStep(currentStep > 1 ? currentStep - 1 : currentStep);
  };

  const onSubmit = useCallback((data: FieldValues) => {
    console.log('Form Data', Object.keys(data));
  }, []);
  return (
    <div
      className={` flex flex-col gap-10 min-h-min bg-white shadow-md px-28 pb-20 pt-14
       `}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <div
            className={`h-10 w-10 rounded-full border border-blue-600 flex justify-center items-center ${
              currentStep > 1 ? 'bg-blue-600 text-white' : ''
            }`}
          >
            <span>1</span>
          </div>

          <hr className={`h-1 ${currentStep > 1 ? 'bg-blue-500' : 'bg-blue-50'}    w-72 `} />
          <div
            className={`h-10 w-10 rounded-full border border-blue-600 flex justify-center items-center  ${
              currentStep === 3 ? 'bg-blue-600 text-white' : ''
            }`}
          >
            <span>2</span>
          </div>
          <hr className={`h-1 w-72 ${currentStep === 3 ? 'bg-blue-600 text-white' : 'bg-blue-50'} `} />
          <div className={`h-10 w-10 rounded-full border border-blue-600 flex justify-center items-center`}>
            <span>3</span>
          </div>
        </div>
        <div className="flex justify-center gap-48 relative">
          <span className="relative right-6">{t('personal-info')}</span>
          <span className="relative right-7">{t('personal-fact')}</span>
          <span className="relative ">{t('ship-fact')}</span>
        </div>
      </div>
      <FormProvider {...methods}>
        <form>
          <div>
            {currentStep === 1 && <PersonalInfo />}
            {currentStep === 2 && <PersonalFactor />}
            {currentStep === 3 && <ShipFactor />}
          </div>
        </form>
      </FormProvider>
      <div className="flex justify-between">
        <div className="w-44">
          <button
            className="w-full h-10 py-2 rounded-lg  text-blue-600 border border-blue-600"
            onClick={handlePrevStep}
          >
            {t('back')}
          </button>
        </div>
        <div>
          {currentStep < 3 ? (
            <button className={'w-44 h-10 bg-blue-600  text-white rounded-md   '} onClick={handleNextStep}>
              {t('next')}
            </button>
          ) : (
            <button
              className={'w-44 h-10 bg-blue-600  text-white rounded-md   '}
              onClick={methods.handleSubmit(onSubmit)}
            >
              {t('submit')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculateSalary;
