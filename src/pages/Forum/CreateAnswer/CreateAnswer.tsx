import React from 'react';
import bemCn from 'bem-cn-lite';
import { useForm } from 'react-hook-form';
import { Button } from 'components/Button';

import './CreateAnswer.pcss';

type Props = {
  onCancel: () => void;
  onSubmit: (data: FormValues) => void;
};

type FormValues = {
  topic?: string;
  content: string;
};

const topicBlock = bemCn('create-answer');

export const CreateAnswerForm: React.VFC<Props> = ({ onCancel, onSubmit }) => {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      topic: '',
      content: '',
    },
  });

  const formSubmitHandler = (data: FormValues) => {
    onSubmit({
      content: data.content,
    });
  };

  return (
    <form className={topicBlock()} onSubmit={handleSubmit(formSubmitHandler)}>
      <label htmlFor="content">Сообщение</label>
      <textarea className={topicBlock('answer-content')} {...register('content')} />
      <Button type="submit" className={topicBlock('button')}>
        Ответить в теме
      </Button>
      <Button className={topicBlock('button')} onClick={onCancel}>
        Отмена
      </Button>
    </form>
  );
};
