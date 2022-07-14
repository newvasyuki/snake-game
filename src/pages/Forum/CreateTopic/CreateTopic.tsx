import React from 'react';
import bemCn from 'bem-cn-lite';
import { useForm } from 'react-hook-form';
import { TopicData } from 'api/forum/types';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import * as yup from 'yup';

import './CreateTopic.pcss';
import { yupResolver } from '@hookform/resolvers/yup';
import { Textarea } from 'components/Textarea/Textarea';

type Props = {
  onCancel: () => void;
  onSubmit: (data: TopicData) => void;
};

type FormValues = {
  topic: string;
  content: string;
};

const schema = yup.object({
  content: yup.string().min(10).max(400),
  topic: yup.string().min(5).max(40),
});

const topicBlock = bemCn('create-topic');

export const CreateTopicForm: React.FC<Props> = ({ onCancel, onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      topic: '',
      content: '',
    },
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const formSubmitHandler = (data: FormValues) => {
    onSubmit({
      title: data.topic,
      content: data.content,
    });
  };

  return (
    <form className={topicBlock()} onSubmit={handleSubmit(formSubmitHandler)}>
      <label htmlFor="topic">Название темы</label>
      <Input
        type="text"
        errorMessage={errors.topic?.message}
        className={topicBlock('topic-name', { error: Boolean(errors.topic?.message) })}
        {...register('topic')}
      />
      <label htmlFor="content">Сообщение</label>
      <Textarea
        className={topicBlock('topic-content', { error: Boolean(errors.content?.message) })}
        errorMessage={errors.content?.message}
        {...register('content')}
      />
      <Button type="submit" className={topicBlock('button')}>
        Создать
      </Button>
      <Button className={topicBlock('button')} onClick={onCancel}>
        Отмена
      </Button>
    </form>
  );
};
