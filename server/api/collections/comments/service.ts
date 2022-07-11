import { CommentInput } from './types';
import { Comment } from '../../../../db/models/comment';

export const saveCommentToDb = async (comment: CommentInput, userId: number, id: number) => {
  return Comment.create({
    topicId: id,
    content: comment.content,
    date: new Date().getTime(),
    userId,
    parentId: comment.parentId,
  });
};
