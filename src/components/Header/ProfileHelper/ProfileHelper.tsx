import React from 'react';
import './ProfileHelper.pcss';
import { Link } from 'react-router-dom';

const ProfileHelper = () => {
  return (
    <div className="profile-helper">
      <div className="profile-helper__image" />
      <Link to="/profile">
        <span className="profile-helper__name">Иван</span>
      </Link>
    </div>
  );
};

export default ProfileHelper;
