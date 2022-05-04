import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const {
    ...restProps
  } = props;

  return (
    <button type="button" {...restProps}>{props.children}</button>
  );
};

export default Button;
