import React, { forwardRef, InputHTMLAttributes, RefObject } from 'react';
import './Input.pcss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  className?: string;
  errorMessage?: string;
}

const Input: React.FunctionComponent<InputProps> = forwardRef((props, ref) => {
  const { type, errorMessage, className, ...restProps } = props;

  return (
    <div className="input-container">
      <input
        ref={ref as RefObject<HTMLInputElement>}
        className={`input ${className}`}
        type={type || 'text'}
        {...restProps}
      />
      <span className="input__error-message">{errorMessage}</span>
    </div>
  );
});

export default Input;
