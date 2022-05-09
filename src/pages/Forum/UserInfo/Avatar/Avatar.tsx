import React from 'react';
import bemCn from 'bem-cn-lite';
import './Avatar.pcss';

type Props = {
  src: string;
};

const block = bemCn('avatar');

export const Avatar = ({ src }: Props) => {
  return (
    <div className={block()}>
      <img className={block('image')} src={src} alt="Аватар" />
    </div>
  );
};
