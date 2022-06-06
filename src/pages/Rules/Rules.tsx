import React from 'react';
import bemCn from 'bem-cn-lite';
import './Rules.pcss';

const block = bemCn('rules-page');

const Rules = () => {
  return (
    <div className={block()}>
      <h3>Правило №1</h3>
      <p>Никогда не нажимать Pause!</p>
      <h3>Правило №1</h3>
      <p>Никогда не нажимать Pause!</p>
      <h3>Правило №1</h3>
      <p>Никогда не нажимать Pause!</p>
      <h3>Правило №1</h3>
      <p>Никогда не нажимать Pause!</p>
    </div>
  )
}

export default Rules;
