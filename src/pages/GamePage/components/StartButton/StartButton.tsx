import bemClassNameLite from 'bem-cn-lite';
import React, { FC } from 'react';
import './StartButton.pcss';

type Props = {
  onClick: () => void;
};

const block = bemClassNameLite('start-button');

export const StartButton: FC<Props> = ({ onClick }) => {
  return (
    <button type="button" className={block()} onClick={onClick}>
      Старт!
    </button>
  );
};
