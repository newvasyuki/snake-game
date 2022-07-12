import React from 'react';
import bemCn from 'bem-cn-lite';
import './MainPage.pcss';

const block = bemCn('main-page');

const MainPage = () => {
  return (
    <div className={block()}>
      <h3>История змейки</h3>
      <p>
        Здесь будет много текста...
      </p>
    </div>
  );
};

export default MainPage;
