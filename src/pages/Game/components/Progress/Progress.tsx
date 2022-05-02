import React from 'react';
import './Progress.pcss';

export default function Progress() {

  return <div className={'progress__block'}>
    <div className={'progress__block__score'}>
      <span>Счет</span>
      <span>184</span>
    </div>
    <div className={'progress__block__record'}>
      <span>Рекорд</span>
      <span>184</span>
    </div>
  </div>
}
