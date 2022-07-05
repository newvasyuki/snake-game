import { userApi } from 'api';
import { User } from 'api/user/types';
import bemCn from 'bem-cn-lite';
import React, { useEffect, useMemo, useState } from 'react';
import { Avatar } from './Avatar';
import './UserInfo.pcss';

type Props = {
  userId: number;
  className?: string;
};

const block = bemCn('user-info');

export const UserInfo = ({ userId, className }: Props) => {
  const [userData, setUserData] = useState<User | null>(null);

  const userName = useMemo(
    () => `${userData?.first_name} ${userData?.second_name[0]}.`,
    [userData],
  );

  useEffect(() => {
    const fetchUser = async () => {
      const user = await userApi.getUserById(userId);

      if (user) {
        setUserData(user);
      }
    };

    if (userId) {
      fetchUser();
    }
  });

  return (
    <div className={block(null, className)}>
      <Avatar src={userData?.avatar} />
      <span className={block('user-name')}>{userName}</span>
    </div>
  );
};
