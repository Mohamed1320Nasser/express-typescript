export type ResponseType = {
  status: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  stack?: string;
};
