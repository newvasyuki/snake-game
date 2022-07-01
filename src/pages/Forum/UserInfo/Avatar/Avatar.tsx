import React from 'react';
import bemCn from 'bem-cn-lite';
import './Avatar.pcss';
import { RESOURCES_URL } from '../../../../constants';

type Props = {
  src: string;
};

const block = bemCn('avatar');

export const Avatar = ({ src }: Props) => {
  return (
    <div className={block()}>
      <img className={block('image')} src={`${RESOURCES_URL}/${src}`} alt="Аватар" />
    </div>
  );
};
