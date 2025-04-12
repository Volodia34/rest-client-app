import { encodeBase64 } from '@/helpers/encodeBase64';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// http://localhost:3000/mini-postman/POST/?url=http://localhost:3000/client/&headers={"Accept":"ssddddd"}&body=eeeeee&params=id=123&key=dog

const EncodePath = () => {
  const { baseUrl, endpointEnCode, encodeParams, method, headers, body } =
    useSelector((state: RootState) => state.rest);
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
    const urlSelect =
      `${encodeBase64(method)}/` +
      (baseUrl ? `?${baseUrl}` : '') +
      (endpointEnCode ? `${endpointEnCode}` : '') +
      (encodeHeader ? `&headers=${encodeHeader}` : '') +
      (body ? `&body=${encodeBase64(body)}` : '') +
      (encodeParams ? `${encodeParams}` : '');
    setUrl(() => urlSelect);
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
