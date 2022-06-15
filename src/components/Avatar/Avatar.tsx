import React, { useEffect, useState } from 'react';
import './Avatar.pcss';
import bemCn from 'bem-cn-lite';
import { useTypedSelector } from '../../store';
import { selectUserData } from '../../store/selectors';
import { RESOURCES_URL } from '../../constants';

type Props = {
  isSmall?: boolean;
};

export const Avatar = (props: Props) => {
  const userData = useTypedSelector(selectUserData);
  const [avatarDivStyle, setAvatarDivStyle] = useState({});
  const { isSmall } = props;

  useEffect(() => {
    if (userData) {
      if (userData.avatar) {
        setAvatarDivStyle({
          background: `url(${RESOURCES_URL}/${userData.avatar}) center center/cover`,
        });
      }
    }
  }, [userData]);

  const avatarComponent = bemCn('profileAvatar');

  return (
    <div
      style={avatarDivStyle}
      className={isSmall ? avatarComponent('small') : avatarComponent()}
    />
  );
};

export default Avatar;
