import React from 'react';
import bemCn from 'bem-cn-lite';
import { useForm } from 'react-hook-form';
import { Button } from 'components/Button';
import { Input } from 'components/Input';

import './CreateTopic.pcss';

type Props = {
  onCancel: () => void;
};

type FormValues = {
  topic: string;
  content: string;
};

const topicBlock = bemCn('create-topic');

export const CreateTopicForm: React.FC<Props> = ({ onCancel }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      topic: '',
      content: '',
    },
  });

  const formSubmitHandler = (data: FormValues) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <form className={topicBlock()} onSubmit={handleSubmit(formSubmitHandler)}>
      <label htmlFor="topic">Название темы</label>
      <Input
        type="text"
        errorMessage={errors.topic?.message}
        className={topicBlock('topic-name')}
        {...register('topic')}
      />
      <label htmlFor="content">Сообщение</label>
      <textarea className={topicBlock('topic-content')} {...register('content')} />
      <Button type="submit" className={topicBlock('button')}>
        Создать
      </Button>
      <Button className={topicBlock('button')} onClick={onCancel}>
        Отмена
      </Button>
    </form>
  );
};
