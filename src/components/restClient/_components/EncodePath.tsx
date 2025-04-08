import { encodeBase64 } from '@/helpers/encodeBase64';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const EncodePath = () => {
  const { baseUrl, endpointEnCode, encodeParams, method } = useSelector(
    (state: RootState) => state.rest
  );

  if (!baseUrl) return;

  return (
    <section className="container path">
      <p>
        {baseUrl}
        {`/${encodeBase64(method)}`}
        {endpointEnCode}
        {encodeParams}
      </p>
    </section>
  );
};

export default EncodePath;
