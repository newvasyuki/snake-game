import React, {forwardRef, InputHTMLAttributes, RefObject} from 'react';
import './Input.pcss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  errorMessage?: string;
}

const Input: React.FunctionComponent<IInputProps> = forwardRef((props, ref) => {
  const {
    type,
    errorMessage,
    ...restProps
  } = props;

  return (
    <div className='input-container'>
      <input
        ref={ref as RefObject<HTMLInputElement>}
        className={'input'}
        type={type || 'text'}
        {...restProps}
      />
      <span className='input__error-message'>{errorMessage}</span>
    </div>
  )
});

export default Input;
