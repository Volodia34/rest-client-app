import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import {
  setBaseUrl,
  setEndpoint,
  setParamsAndEncode,
  setUrlValueInput,
} from '@/store/slices/urlSlice';
import { setMethod } from '@/store/slices/bodySlice';
import { setHeadersFromLS } from '@/store/slices/headerSlice';
import { HeaderRest } from '@/types/restClient';

export const useUrlParams = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = searchParams.get('url');
    const methods = searchParams.get('methods')?.split(',') || [];
    const method = searchParams.get('method');
    const headers = searchParams.get('headers');

    if (url) {
      try {
        const urlObj = new URL(url);
        dispatch(setUrlValueInput(url));
        dispatch(setBaseUrl(`${urlObj.protocol}//${urlObj.host}`));
        dispatch(setEndpoint(urlObj.pathname));

        const params = urlObj.search.substring(1);
        if (params) {
          dispatch(setParamsAndEncode({ params }));
        }
      } catch (error) {
        console.error('Invalid URL:', error);
      }
    }

    if (methods.length > 0) {
      dispatch(setMethod(methods[0].toUpperCase()));
    } else if (method) {
      dispatch(setMethod(method.toUpperCase()));
    }

    if (headers) {
      try {
        const parsedHeaders = JSON.parse(
          decodeURIComponent(headers)
        ) as HeaderRest[];
        if (Array.isArray(parsedHeaders)) {
          dispatch(setHeadersFromLS(parsedHeaders));
        }
      } catch (error) {
        console.error('Invalid headers format:', error);
      }
    }
  }, [dispatch, searchParams]);
};
