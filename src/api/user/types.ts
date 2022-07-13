export type PasswordData = {
  oldPassword: string;
  newPassword: string;
};

export type YandexUser = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
  email: string;
  phone: string;
};

// we store users in our forum db as well
export type ForumUser = {
  id: number;
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  avatar: string;
  email: string;
  phone: string;
};
