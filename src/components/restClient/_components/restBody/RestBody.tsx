'use client';

import Textarea from '@/UI/inputs/Textarea';
import RequestSection from '../RequestSection';
import { ChangeEvent, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setBody, setFormatBody } from '@/store/slices/restSlice';
import SelectInput from '@/UI/inputs/SelectInput';
import { Options } from '@/types/restClient';
import { option } from '@/constants/mockData';

const optionsMinLength = 1;

const RestBody = () => {
  const dispatch = useDispatch();
  const { body, formatBody } = useSelector((state: RootState) => state.rest);
  const [error, setError] = useState('');
  const [optionsValue, setOptionsValue] = useState(option);
  const [render, setRender] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setBody(e.target.value as string));
    setError('');
  };

  const handleFormat = (e: MouseEvent<HTMLElement>) => {
    const id = (e.target as HTMLElement).id as Options;
    dispatch(setFormatBody(id));
    setRender(!render);
  };

  const handleFormatChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const filtered = option.filter((el) =>
      el.toLowerCase().includes(val.toLowerCase())
    );
    setOptionsValue(() => filtered);
    if (optionsValue.length && optionsValue.length === optionsMinLength) {
      dispatch(setFormatBody(optionsValue[0] as Options));
    } else {
      dispatch(setFormatBody(''));
    }
  };

  const handlePrettify = () => {
    if (formatBody === 'JSON') {
      try {
        const parsed = JSON.parse(body);
        const prettyJson = JSON.stringify(parsed, null, 2);
        dispatch(setBody(prettyJson));
        setError('');
      } catch (err) {
        setError(`${err}`);
      }
    }
    if (formatBody === 'Text') {
      const text = body.trim();
      const quoted = `"${text}"`;
      dispatch(setBody(quoted));
      setError('');
    }
  };

  return (
    <RequestSection
      title="Body:"
      buttonText={'Prettify'}
      onClick={handlePrettify}
    >
      <SelectInput
        key={`${render}`}
        data-testid="headers-key"
        value={formatBody}
        forInput="headers-key"
        type="text"
        options={optionsValue}
        onChange={handleFormatChange}
        onSelect={handleFormat}
      />

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
