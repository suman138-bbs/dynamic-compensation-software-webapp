import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';
import Select, { SelectComponentsConfig } from 'react-select';

import { SelectOption } from '../../models/common';
import { FormLabel } from '../form-label';

type SingleSelectInputProps<T extends FieldValues, V = string> = {
  label?: string;
  name: Path<T>;
  control?: Control<T, object>;
  onChange?: (value?: SelectOption) => void;
  data?: SelectOption<V>[];
  isSearchable?: boolean;
  isDisabled?: boolean;
  isClearable?: boolean;
  components?: Partial<SelectComponentsConfig<any, false, any>>;
  error?: FieldError;
};

export function SingleSelectInput<T extends FieldValues, V = string>({
  label,
  name,
  control,
  onChange,
  data = [],
  isSearchable,
  isDisabled,
  isClearable,
  components,

  error,
}: SingleSelectInputProps<T, V>) {
  return (
    <div className="flex flex-col">
      {label && <FormLabel className="mb-1">{label}</FormLabel>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            isSearchable={isSearchable}
            value={field.value}
            onChange={onChange || field.onChange}
            options={data}
            classNamePrefix={name}
            className="text-sm border-black w-96"
            isDisabled={isDisabled}
            menuPortalTarget={document.body}
            isClearable={isClearable}
            components={components}
          />
        )}
      />

      {error?.message && <span className="mt-1 text-sm font-normal text-red-500">{error.message}</span>}
    </div>
  );
}
