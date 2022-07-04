import React, { useEffect } from 'react';
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useTypedDispatch, useTypedSelector } from 'store';
import { darkMode, selectUserData } from 'store/selectors';
import bemCn from 'bem-cn-lite';
import { handleDarkMode } from '../../store/actionCreators';
import './ThemesToggle.pcss';

const ThemesToggle = () => {
  const user = useTypedSelector(selectUserData);
  const dispatch = useTypedDispatch();
  const { isDarkMode } = useSelector(darkMode);

  const switchDarkMode = () => {
    dispatch(handleDarkMode(!isDarkMode, user.id));
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', '');
    }
  }, [isDarkMode]);

  const darkModeToggle = bemCn('darkmode-toggle');

  return (
    <div className={darkModeToggle()}>
      <input
        type="checkbox"
        className={darkModeToggle('checkbox')}
        id="checkbox"
        checked={isDarkMode}
        onClick={switchDarkMode}
        onChange={(e) => {}}
      />
      <label htmlFor="checkbox" className={darkModeToggle('label')}>
        <BsFillSunFill color="yellow" />
        <BsMoonStarsFill color="white" />
        <div className={darkModeToggle('ball')} />
      </label>
    </div>
  );
};

export default ThemesToggle;
