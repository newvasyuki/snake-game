export class ApiError extends Error {
  public readonly errCode: number;

  constructor(message: string, errCode?: number) {
    super(message);
    this.errCode = errCode || 500;
  }
}
