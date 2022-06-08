import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import bemCn from 'bem-cn-lite';
import { schema } from './passwordSchema';
import { Input } from '../../../../components/Input';
import './ChangePassword.pcss';
import { Button } from '../../../../components/Button';

type Props = {
  onChangePassword: (data: ChangePasswordData) => void;
  onCancel: () => void;
  showChangePasswordErrorText: boolean;
};

export type ChangePasswordData = {
  old_password: string;
  new_password: string;
};

const isPasswordChangeFailedText =
  'Обновление пароля не удалось. Проверьте правильность введенных паролей';

export const ChangePassword = (props: Props) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<ChangePasswordData>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const blockChangePass = bemCn('change-password');
  const blockChangePassForm = bemCn('change-password-form');

  return (
    <div className={blockChangePass()}>
      <form className={blockChangePassForm()} onSubmit={handleSubmit(props.onChangePassword)}>
        <div className={blockChangePassForm('container')}>
          <div className={blockChangePassForm('input-container')}>
            <label className={blockChangePassForm('label')} htmlFor="old_password">
              Старый пароль
            </label>
            <Input
              type="password"
              className={blockChangePassForm('input-field')}
              errorMessage={errors.old_password?.message}
              {...register('old_password')}
            />
          </div>

          <div className={blockChangePassForm('input-container')}>
            <label className={blockChangePassForm('label')} htmlFor="new_password">
              Новый пароль
            </label>
            <Input
              type="password"
              className={blockChangePassForm('input-field')}
              errorMessage={errors.new_password?.message}
              {...register('new_password')}
            />
          </div>
          <div className={blockChangePassForm('buttons-container')}>
            <span className={blockChangePassForm('error-message')}>
              {props.showChangePasswordErrorText ? isPasswordChangeFailedText : null}
            </span>
            <Button type="submit">Изменить пароль</Button>
            <Button type="button" onClick={props.onCancel}>
              Отменить
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
