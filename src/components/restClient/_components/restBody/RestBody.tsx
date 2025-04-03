'use client';

import Textarea from '@/UI/inputs/Textarea';
import RequestSection from '../RequestSection';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setBody } from '@/store/slices/restSlice';

const RestBody = () => {
  const dispatch = useDispatch();
  const { body } = useSelector((state: RootState) => state.rest);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setBody(e.target.value as string));
    setError('');
  };

  const handlePrettify = () => {
    try {
      const parsed = JSON.parse(body);
      const prettyJson = JSON.stringify(parsed, null, 2) as string;
      dispatch(setBody(prettyJson));
      setError('');
    } catch (err) {
      setError(`${err}`);
    }
  };

  return (
    <RequestSection
      title="Body:"
      buttonText={'Prettify'}
      onClick={handlePrettify}
    >
      <Textarea
        forInput="body-json"
        value={body}
        onChange={handleChange}
        placeholder="Enter JSON..."
      />
      <p className={error ? 'error' : 'hidden'}>{error}.</p>
    </RequestSection>
  );
};

export default RestBody;
