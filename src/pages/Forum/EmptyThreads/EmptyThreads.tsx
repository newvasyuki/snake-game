import React from 'react';
import bemCn from 'bem-cn-lite';

import './EmptyThreads.pcss';

const block = bemCn('empty-threads');

export const EmptyThreads = () => {
  return (
    <div className={block()}>
      <span className={block('text')}>Нет сообщений</span>
    </div>
  );
};
