import { StatusCodes } from '../shared/constants';
import { ApiError } from './ApiError';

export class ResourceNotFoundError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}
