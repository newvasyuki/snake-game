export type TopicData = {
  title: string;
  content: string;
};

export type CommentData = {
  topicId: number;
  parentId: number;
  content: string;
};
