export type NetworkError = {
  type?: 'network';
  message?: string;
  status?: number;
  statusText?: string;
};

export type HttpError = {
  type: 'http';
  status?: number;
  statusText?: string;
  message?: string;
};

export type ApplicationError = NetworkError | HttpError;
