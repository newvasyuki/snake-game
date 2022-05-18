import React, { InputHTMLAttributes, forwardRef, RefObject } from 'react';
import './ProfileInput.pcss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  value?: string;
  errorMsg?: string;
  inputClass?: string;
  labelClassName?: string;
}

export const ProfileInput = forwardRef((props: InputProps, ref) => {
  const { id, errorMsg, inputClass, labelClassName, label, value, ...restProps } = props;

  return (
    <>
      <div className="profile-page__input-field-wrapper">
        <label className={labelClassName ?? 'profile-page__input-field'} htmlFor={id}>
          {label}
        </label>
        <input
          value={value}
          ref={ref as RefObject<HTMLInputElement>}
          className={inputClass ?? 'profile-page__input-field'}
          id={id}
          {...restProps}
        />
      </div>
      <span className="profile-page__input-field_error-msg">{errorMsg}</span>
    </>
  );
});
