import { CommentInput } from './types';
import { Comment } from '../../../../db/models/comment';

export const postCommentToDb = async (comment: CommentInput) => {
  return Comment.create({
    topicId: comment.topicId,
    content: comment.content,
    date: new Date().getTime(),
    userId: comment.userId, // should come from params
  });
};
