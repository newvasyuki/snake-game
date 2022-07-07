import bemCn from 'bem-cn-lite';
import React, { useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from 'store';
import { setUserInfoByIdAsync } from 'store/actionCreators';
import { selectUserData } from 'store/selectors';
import { Avatar } from './Avatar';
import './UserInfo.pcss';

type Props = {
  userId: number;
  className?: string;
};

const block = bemCn('user-info');

export const UserInfo = ({ userId, className }: Props) => {
  const userInfo = useTypedSelector(selectUserData);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(setUserInfoByIdAsync(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className={block(null, className)}>
      <Avatar src={userInfo?.avatar} />
      <span className={block('user-name')}>
        {userInfo?.first_name} {userInfo?.second_name}
      </span>
    </div>
  );
};
