import { StatusCodes } from '../shared/constants';
import { ApiError } from './ApiError';

export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
  }
}
