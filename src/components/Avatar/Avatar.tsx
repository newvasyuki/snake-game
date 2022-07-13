import React, { useEffect, useState } from 'react';
import './Avatar.pcss';
import bemCn from 'bem-cn-lite';
import { useTypedSelector } from '../../store';
import { selectUserData } from '../../store/selectors';
import { RESOURCES_URL } from '../../constants';

type Props = {
  isSmall?: boolean;
};

const Avatar = (props: Props) => {
  const userData = useTypedSelector(selectUserData);
  const [avatarDivStyle, setAvatarDivStyle] = useState({});
  const { isSmall } = props;

  useEffect(() => {
    if (userData) {
      if (userData.avatar) {
        const url = `${RESOURCES_URL}/${userData.avatar}`.replace(/\s+/g, '%20');
        setAvatarDivStyle({
          background: `url(${url}) center center/cover`,
        });
      }
    }
  }, [userData]);

  const avatarComponent = bemCn('profileAvatar');

  return (
    <div
      data-testid="avatar"
      style={avatarDivStyle}
      className={avatarComponent({ small: isSmall })}
    />
  );
};

export default Avatar;
