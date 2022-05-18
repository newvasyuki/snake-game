import React from "react";
import bemCn from 'bem-cn-lite';
import './ErrorPageTemplate.pcss';

const block = bemCn('block-error');

const ErrorPageTemplate = ({title, description}) => {

  return (
        <div className={block()}>
          <div className={block('title')}>{title}</div>
          <div className={block('description')}>{description}</div>
        </div>
  );
};

export default ErrorPageTemplate;
