import React from 'react';
import bemCn from 'bem-cn-lite';
import './Avatar.pcss';
import { RESOURCES_URL } from '../../../../constants';

type Props = {
  src: string;
};

const block = bemCn('avatar');

export const Avatar = ({ src }: Props) => {
  const avatarPath = src ? `${RESOURCES_URL}/${src}` : '';
  return (
    <div className={block()}>
      <img className={block('image')} src={avatarPath} alt="Аватар" />
    </div>
  );
};
