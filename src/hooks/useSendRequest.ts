import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const useSendRequest = () => {
  const { urlValueInput } = useSelector((state: RootState) => state.urlSlice);
  const { method, body } = useSelector((state: RootState) => state.bodySlice);
  const { variables: headersArray } = useSelector(
    (state: RootState) => state.headerSlice
  );

  const sendRequest = async () => {
    if (!urlValueInput) {
      console.error('URL is required');
      return { status: 400, data: { error: 'URL is required' } };
    }

    const encodedUrl = encodeURIComponent(urlValueInput);

    const headers: Record<string, string> = headersArray.reduce(
      (acc, { key, value }) => {
        if (key) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    if (
      ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) &&
      !headers['Content-Type']
    ) {
      headers['Content-Type'] = 'application/json';
    }

    const finalBody = method !== 'GET' ? body : undefined;

    console.log('Sending request via proxy:');
    console.log('URL:', `/api/proxy?url=${encodedUrl}`);
    console.log('Method:', method);
    console.log('Headers:', headers);
    console.log('Body:', finalBody);

    try {
      const response = await fetch(`/api/proxy?url=${encodedUrl}`, {
        method,
        headers,
        body: finalBody,
      });

      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json')
        ? await response.json()
        : await response.text();

      console.log('Response status:', response.status);
      console.log('Response data:', data);

      return { status: response.status, data };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Request failed';
      console.error('Request failed:', errorMessage);
      return { status: 500, data: { error: errorMessage } };
    }
  };

  return { sendRequest };
};
