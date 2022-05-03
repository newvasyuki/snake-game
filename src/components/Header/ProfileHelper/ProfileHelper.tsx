import React from 'react';
import ProfileImage from '../../../../assets/noProfileImage.react.svg';
import './ProfileHelper.pcss';
import { useNavigate } from 'react-router-dom';

const ProfileHelper = () => {
  const navigate = useNavigate();

  return (
    <div className={'profile-helper'}>
      <div className={'profile-helper__image'}>
      </div >
        <span onClick={() => navigate('/profile')} className={'profile-helper__name'} >Иван</span>
    </div>
  )
}

export default ProfileHelper;