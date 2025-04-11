import { encodeBase64 } from '@/helpers/encodeBase64';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const EncodePath = () => {
  const { baseUrl, endpointEnCode, encodeParams, method, headers, body } =
    useSelector((state: RootState) => state.rest);
  const [encodeHeader, setEncodeHeader] = useState('');

  useEffect(() => {
    if (headers && Array.isArray(headers) && headers.length > 0) {
      const headerString: { [key: string]: string } = {};
      headers.forEach((el) => {
        headerString[el.key] = el.value;
      });
      setEncodeHeader(encodeBase64(JSON.stringify(headerString)));
    }
  }, [headers]);

  if (!baseUrl) return;

  return (
    <section className="container path">
      <p>
        {baseUrl}
        {`/${encodeBase64(method)}`}
        {endpointEnCode}
        {encodeParams}
        {`&headers=${encodeHeader}`}
        {`&body=${encodeBase64(body)}`}
      </p>
    </section>
  );
};

export default EncodePath;
