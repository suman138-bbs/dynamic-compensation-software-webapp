import classNames from 'classnames';
import React, { forwardRef, useMemo } from 'react';

import { FieldError } from 'react-hook-form';
import { FormLabel } from '../form-label';

type TextInputProps = {
  type?: HTMLInputElement['type'];
  label: string;
  wrapperClassName?: string;
  name?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: FieldError;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'suffix'>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { type = 'text', label, error, className, name, prefix, suffix, wrapperClassName, placeholder, ...otherProps },
    ref,
  ) => {
    const prefixValue = useMemo(() => {
      if (prefix) {
        return prefix;
      }
    }, [prefix]);

    const suffixValue = useMemo(() => {
      if (suffix) {
        return suffix;
      }
    }, [suffix]);

    return (
      <div className={wrapperClassName}>
        <div className="flex items-center justify-between">
          {label && <FormLabel className="mb-1 block text-sm font-medium text-gray-700">{label}</FormLabel>}
        </div>
        <div
          className={classNames(
            'relative flex flex-row items-center rounded-md border shadow-sm',
            !!error
              ? 'border-red-300 focus-within:border-red-400 focus-within:ring-red-400'
              : 'border-gray-300 focus-within:border-gray-500 focus-within:ring-gray-500',
          )}
        >
          {prefixValue && (
            <div className="pointer-events-none flex shrink-0 items-center text-gray-500 ps-2.5 sm:text-sm">
              {prefixValue}
            </div>
          )}
          <input
            type={type}
            className={classNames(
              'block w-full rounded-md border-0 px-2.5 outline-none focus:border-0 focus:outline-none focus:ring-0 sm:text-sm',

              className,
            )}
            placeholder={placeholder}
            {...otherProps}
            step="any"
            ref={ref}
            name={name}
          />
          {suffixValue && (
            <div className="pointer-events-none flex shrink-0 items-center text-gray-500 pe-2.5 sm:text-sm">
              {suffixValue}
            </div>
          )}
        </div>
        {error?.message && <span className="mt-1 text-sm text-red-600">{error.message}</span>}
      </div>
    );
  },
);
