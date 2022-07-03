import React from 'react';
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import './ThemesToggle.pcss';

const ThemesToggle = () => {
  const makeDark = () => {
    document.documentElement.setAttribute('data-theme', 'dark');
  };

  return (
    <div id="darkmode">
      <input type="checkbox" className="checkbox" id="checkbox" onClick={makeDark} />
      <label htmlFor="checkbox" className="label">
        <BsFillSunFill color="yellow" />
        <BsMoonStarsFill color="white" />
        <div className="ball" />
      </label>
    </div>
  );
};

export default ThemesToggle;
