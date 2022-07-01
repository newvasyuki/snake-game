import { userApi } from 'api';
import { User } from 'api/user/types';
import bemCn from 'bem-cn-lite';
import React, { useEffect, useState } from 'react';
import { Avatar } from './Avatar';
import './UserInfo.pcss';

type Props = {
  userId: number;
  className?: string;
};

const block = bemCn('user-info');

export const UserInfo = ({ userId, className }: Props) => {
  const [userInfo, setUserInfo] = useState<User>(null);
  useEffect(() => {
    async function getUserInfoById(id: number) {
      const res = await userApi.getUserInfoById(id);
      if (res) {
        setUserInfo(res);
      }
    }
    if (userId) {
      getUserInfoById(userId);
    }
  }, [userId]);

  return (
    <div className={block(null, className)}>
      <Avatar src={userInfo?.avatar} />
      <span className={block('user-name')}>{userInfo?.display_name}</span>
    </div>
  );
};
