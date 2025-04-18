import { ApplicationError } from '@/types/errors';

export async function handleFetchError(
  response: Response
): Promise<ApplicationError | null> {
  if (!response.ok) {
    return {
      type: 'http',
      status: response.status,
      statusText: response.statusText,
    };
  }
  return null;
}

export function createNetworkError(message: string): ApplicationError {
  return {
    type: 'network',
    message,
  };
}
