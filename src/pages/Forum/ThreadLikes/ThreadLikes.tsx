import React from 'react';
import bemCn from 'bem-cn-lite';
import HeartIcon from '../../../../assets/heart-icon.svg';
import './ThreadLikes.pcss';

type Props = {
  count?: number;
  likeClickHandler?: () => void;
};

const block = bemCn('likes');

export const ThreadLikes = ({ count, likeClickHandler }: Props) => {
  return (
    <div className={block()}>
      <button type="button" onClick={likeClickHandler} className={block('button')}>
        <div className={block('icon')}>
          <HeartIcon />
        </div>
      </button>
      <span className={block('count')}>{count ?? 0}</span>
    </div>
  );
};
