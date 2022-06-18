import React from 'react';
import './ProfileHelper.pcss';
import { Link } from 'react-router-dom';
import bemCn from 'bem-cn-lite';
import { selectUserData } from '../../../store/selectors';
import { useTypedSelector } from '../../../store';
import { Avatar } from '../../Avatar';

const ProfileHelper = () => {
  const userData = useTypedSelector(selectUserData);
  const profileHelperPage = bemCn('profile-helper');

  return (
    <Link className={profileHelperPage()} to="/profile" data-testid="profile-helper">
      <Avatar isSmall />
      <span className={profileHelperPage('name')}>
        {userData?.first_name} {userData?.second_name}
      </span>
    </Link>
  );
};

export default ProfileHelper;
