import { ForumUser } from 'api/user/types';
import bemCn from 'bem-cn-lite';
import React from 'react';
import { Avatar } from './Avatar';
import './UserInfo.pcss';

type Props = {
  user: ForumUser;
  className?: string;
};

const block = bemCn('user-info');

const displayName = (user?: ForumUser) => {
  return user?.displayName ?? `${user?.firstName} ${user?.secondName}`;
};

export const UserInfo = ({ user, className }: Props) => {
  return (
    <div className={block(null, className)}>
      <Avatar src={user?.avatar} />
      <span className={block('user-name')}>{displayName(user)}</span>
    </div>
  );
};
