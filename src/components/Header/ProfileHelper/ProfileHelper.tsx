import React from 'react';
import './ProfileHelper.pcss';
import { Link } from 'react-router-dom';
import { selectUserData } from '../../../store/selectors';
import { useTypedSelector } from '../../../store';

const ProfileHelper = () => {
  const userData = useTypedSelector(selectUserData);

  return (
    <div className="profile-helper">
      <div className="profile-helper__image" />
      <Link to="/profile">
        <span className="profile-helper__name">{userData?.display_name}</span>
      </Link>
    </div>
  );
};

export default ProfileHelper;
