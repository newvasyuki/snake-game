import React from 'react';
import bemCn from 'bem-cn-lite';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/Button';
import * as yup from 'yup';

import './CreateAnswer.pcss';
import { Textarea } from 'components/Textarea/Textarea';

type Props = {
  onCancel: () => void;
  onSubmit: (data: FormValues) => void;
};

type FormValues = {
  content: string;
};

const schema = yup.object({
  content: yup.string().min(10).max(400),
});

const topicBlock = bemCn('create-answer');

export const CreateAnswerForm: React.VFC<Props> = ({ onCancel, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      content: '',
    },
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const formSubmitHandler = (data: FormValues) => {
    onSubmit({
      content: data.content,
    });
  };

  return (
    <form className={topicBlock()} onSubmit={handleSubmit(formSubmitHandler)}>
      <label htmlFor="content">Сообщение</label>
      <Textarea
        className={topicBlock('answer-content')}
        errorMessage={errors.content?.message}
        {...register('content')}
      />
      <Button type="submit" className={topicBlock('button')}>
        Ответить в теме
      </Button>
      <Button className={topicBlock('button')} onClick={onCancel}>
        Отмена
      </Button>
    </form>
  );
};
