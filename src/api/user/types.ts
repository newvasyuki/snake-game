export type PasswordData = {
  oldPassword: string;
  newPassword: string;
};

export type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
  email: string;
  phone: string;
};
