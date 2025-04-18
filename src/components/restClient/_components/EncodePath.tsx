import { encodeBase64 } from '@/helpers/encodeBase64';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// http://localhost:3000/mini-postman/POST/?url=http://localhost:3000/client/&headers={"Accept":"ssddddd"}&body=eeeeee&params=id=123&key=dog

const EncodePath = () => {
  const { baseUrl, endpointEnCode, encodeParams } = useSelector(
    (state: RootState) => state.urlSlice
  );
  const { variables: headers } = useSelector(
    (state: RootState) => state.headerSlice
  );
  const { body, method } = useSelector((state: RootState) => state.bodySlice);
  const [encodeHeader, setEncodeHeader] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (headers && Array.isArray(headers) && headers[0]?.key) {
      const headerString: { [key: string]: string } = {};
      headers.forEach((el) => {
        headerString[el.key] = el.value;
      });
      setEncodeHeader(encodeBase64(JSON.stringify(headerString)));
    }
  }, [headers]);

  useEffect(() => {
    let urlSelect = `${encodeBase64(method)}/`;
    const params = new URLSearchParams();

    if (baseUrl) params.set('url', `${baseUrl}${endpointEnCode || ''}`);
    if (encodeHeader) params.set('headers', encodeHeader);
    if (body) params.set('body', encodeBase64(body));
    if (encodeParams) params.set('params', encodeParams);

    const queryString = params.toString();

    if (queryString) urlSelect += `?${queryString}`;

    setUrl(urlSelect);

    // const currentUrl = new URL(window.location.href);
    // currentUrl.pathname = `/${urlSelect}`;
    // window.history.pushState({}, '', currentUrl.toString());
  }, [
    baseUrl,
    body,
    encodeHeader,
    encodeParams,
    endpointEnCode,
    headers,
    method,
  ]);

  if (!baseUrl) return;

  return (
    <section className="container path">
      <p>{url}</p>
    </section>
  );
};

export default EncodePath;
