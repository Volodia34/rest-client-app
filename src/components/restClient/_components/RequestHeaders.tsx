import RequestSection from './RequestSection';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import HeadersInput from './headers/HeadersInput';
import { setNewHeader } from '@/store/slices/headerSlice';
import { setHeadersFromLS } from '@/store/slices/headerSlice';
import { useEffect, useState, useCallback } from 'react';
import { getFromLocalStorage } from '@/helpers/localActions';
import { HeaderRest } from '@/types/restClient';
import { useLanguageContext } from '@/context/LanguageContext';

const RequestHeaders = () => {
  const { t } = useLanguageContext();
  const dispatch = useDispatch();
  const { headers } = useSelector((state: RootState) => state.headerSlice);

  const addHeaderBlock = useCallback(() => {
    dispatch(setNewHeader());
  }, [dispatch]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = getFromLocalStorage('headers');
      if (saved) {
        dispatch(setHeadersFromLS(saved as HeaderRest[]));
      }
    }
    setMounted(true);
  }, [dispatch]);

  useEffect(() => {
    if (!headers.length) {
      addHeaderBlock();
    }
  }, [headers, addHeaderBlock]);

  if (!mounted) {
    return null;
  }

  return (
    <RequestSection
      title={t('restClient.headerTitle') as string}
      buttonText={t('restClient.headerAddButtonText') as string}
      onClick={addHeaderBlock}
    >
      {headers.length &&
        headers.map((el, index) => (
          <HeadersInput key={`${index}-item-header`} id={el.id} index={index} />
        ))}
      <p></p>
    </RequestSection>
  );
};

export default RequestHeaders;
