import { CommentType } from '../types';

export const getCommentsCount = (treeLikeComments: CommentType[], count = 0) => {
  // eslint-disable-next-line no-param-reassign
  count = treeLikeComments.length;
  if (count === 0) return 0;
  // eslint-disable-next-line no-return-assign, no-param-reassign
  treeLikeComments.forEach((comment) => (count += getCommentsCount(comment.children, count)));
  return count;
};
