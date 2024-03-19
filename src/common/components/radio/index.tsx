import classNames from 'classnames';
import { FieldError } from 'react-hook-form';
import { forwardRef } from 'react';

import { FormLabel } from '../form-label';

type RadioInputProps = {
  label?: string;
  error?: FieldError;
  className?: string;
  id: string;
  name: string;
  value: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(
  ({ label, error, className, id, value, ...otherProps }, ref) => {
    return (
      <div>
        <div className="flex gap-2 items-center">
          <input type="radio" id={id} className={classNames(className)} value={value} ref={ref} {...otherProps} />
          <FormLabel htmlFor={id}>{label}</FormLabel>
        </div>
        {error?.message && <span className="mt-1 text-sm text-red-600">{error.message}</span>}
      </div>
    );
  },
);
