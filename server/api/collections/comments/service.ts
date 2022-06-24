import { CommentInput } from './types';
import { Comment } from '../../../../db/models/comment';

export const loadComments = async (topicId: number) => {
  return Comment.findAll({ where: { topicId } });
};

export const postCommentToDb = async (comment: CommentInput, userId: number, id: number) => {
  return Comment.create({
    topicId: id,
    content: comment.content,
    date: new Date().getTime(),
    userId,
  });
};
