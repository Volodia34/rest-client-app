import RequestSection from './RequestSection';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import HeadersInput from './headers/HeadersInput';
import { setNewHeader } from '@/store/slices/restSlice';

const RequestHeaders = () => {
  const dispatch = useDispatch();
  const { headers } = useSelector((state: RootState) => state.rest);

  const addHeaderBlock = () => {
    dispatch(setNewHeader())
  }

  return (
    <RequestSection title="Headers:" buttonText="Add Header" onClick={addHeaderBlock}>
      {headers.length && headers.map((el, index) => (
          <HeadersInput key={`${index}-item-header`} id={el.id} index={index} />
        ))}
        <p></p>
    </RequestSection>
  );
};

export default RequestHeaders;
