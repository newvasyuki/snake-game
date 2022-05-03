import React, { ReactNode, ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string,
  buttonClass?: string,
}

const Button = (props: IButtonProps) => {
  const {
    text,
    buttonClass,
    ...restProps
  } = props;

  return(
    <button {...restProps}>{text}</button>
  )
}

export default Button;
