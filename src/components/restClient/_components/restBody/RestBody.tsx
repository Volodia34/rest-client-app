'use client';

import Textarea from '@/UI/inputs/Textarea';
import RequestSection from '../RequestSection';
import { ChangeEvent, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setFormatBody } from '@/store/slices/bodySlice';
import SelectInput from '@/UI/inputs/SelectInput';
import { Options } from '@/types/restClient';
import { option } from '@/constants/mockData';
import { setBody } from '@/store/slices/bodySlice';
import { useVariable } from '@/hooks/useVariable';
import { isVariables, replaceVariables } from '@/helpers/replaceVariables';
import { useLanguageContext } from '@/context/LanguageContext';

const optionsMinLength = 1;

const RestBody = () => {
  const { t } = useLanguageContext();
  const dispatch = useDispatch();
  const { body, formatBody } = useSelector(
    (state: RootState) => state.bodySlice
  );
  const [error, setError] = useState('');
  const [bodyChange, setBodyChange] = useState(body);
  const [optionsValue, setOptionsValue] = useState(option);
  const [render, setRender] = useState(false);

  const { variables } = useVariable();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBodyChange(e.target.value as string);
  };

  const handleBlur = () => {
    let changeBody = '';
    if (isVariables(bodyChange)) {
      changeBody = replaceVariables(bodyChange, variables);
      setBodyChange(changeBody);
    }
    dispatch(setBody(changeBody || bodyChange));
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
        setBodyChange(prettyJson);
      } catch (err) {
        setError(`${err}`);
      }
    }
  };

  return (
    <RequestSection
      title={t('restClient.restBodyTitle') as string}
      buttonText={
        formatBody === 'JSON'
          ? (t('restClient.restBodyButtonText') as string)
          : undefined
      }
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
        value={bodyChange}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={t('restClient.restBodyPlaceholder') as string}
      />
      <p className={error ? 'error' : 'hidden'}>{error}.</p>
    </RequestSection>
  );
};

export default RestBody;
