import React from 'react';
import bemCn from 'bem-cn-lite';
import { AddButton } from '../AddButton';

import './Header.pcss';

const block = bemCn('forum-header');

type Props = {
  onAddTopic: () => void;
};

export const Header: React.VFC<Props> = ({ onAddTopic }) => {
  return (
    <div className={block()}>
      <AddButton onClick={onAddTopic} />
    </div>
  );
};
