import React from 'react';
import bemCn from 'bem-cn-lite';
import HeartIcon from '../../../../assets/heart-icon.svg';
import './ThreadLikes.pcss';

type Props = {
  count?: number;
  likeClickHandler?: () => void;
  className?: string;
};

const block = bemCn('likes');

export const ThreadLikes = ({ count, likeClickHandler, className }: Props) => {
  return (
    <div className={block(null, className)}>
      <button type="button" onClick={likeClickHandler} className={block('button')}>
        <div className={block('icon')}>
          <HeartIcon />
        </div>
      </button>
      <span className={block('count')}>{count ?? 0}</span>
    </div>
  );
};
