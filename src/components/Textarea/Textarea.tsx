import React, { forwardRef, RefObject, TextareaHTMLAttributes, VFC } from 'react';
import bemCn from 'bem-cn-lite';

import './Textarea.pcss';

type OwnProps = {
  errorMessage?: string;
};

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & OwnProps;

const block = bemCn('textarea');

export const Textarea: VFC<TextareaProps> = forwardRef(
  ({ errorMessage, className, ...rest }, ref) => {
    return (
      <div className={block({ error: Boolean(errorMessage) }, className)}>
        <textarea
          className={block('control')}
          ref={ref as RefObject<HTMLTextAreaElement>}
          {...rest}
        />
        {errorMessage && <span className={block('error')}>{errorMessage}</span>}
      </div>
    );
  },
);
