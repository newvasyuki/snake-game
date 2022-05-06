import bemCn from 'bem-cn-lite';
import React, { useMemo } from 'react';
import { User } from '../../../api/auth/types';
import { Avatar } from './Avatar';
import './UserInfo.pcss';

type Props = {
  user: Pick<User, 'avatar' | 'first_name' | 'second_name'>;
  className?: string;
};

const block = bemCn('user-info');

export const UserInfo = ({ user, className }: Props) => {
  const userName = useMemo(() => `${user.first_name} ${user.second_name[0]}.`, [user]);

  return (
    <div className={block(null, className)}>
      <Avatar src={user.avatar} />
      <span className={block('user-name')}>{userName}</span>
    </div>
  );
};
