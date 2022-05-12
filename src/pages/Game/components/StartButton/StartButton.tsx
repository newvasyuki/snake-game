import React, { FC } from 'react';

type Props = {
  onClick: () => void;
};

export const StartButton: FC<Props> = ({ onClick }) => {
  return (
    <button type="button" className="screen__btn-start" onClick={onClick}>
      Старт!
    </button>
  );
};
