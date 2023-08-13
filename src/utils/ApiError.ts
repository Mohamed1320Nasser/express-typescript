class AppError extends Error {
  status: number;
  err: string;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.err = 'error';
  }
}
export default AppError;
