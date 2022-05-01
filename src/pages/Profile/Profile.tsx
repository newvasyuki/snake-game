import React from "react";
import './Profile.pcss';
import ProfileImage from '../../../assets/noProfileImage.react.svg';

export default function Profile() {
  return (
    <div className={'profile-page'}>
      <div className={'profile-page__sidebar'}>
        <button className={'profile-page__button-back'} />
      </div>
      <div className={'profile-page__content'}>
        <ProfileImage className={'profile-page__image'} />
      </div>
    </div>
  )
}