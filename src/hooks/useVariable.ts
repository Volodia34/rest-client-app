'use client';

import { useDispatch, useSelector } from 'react-redux';
import { removeVariable, setVariables } from '@/store/slices/variablesSlice';
import { getFromLocalStorage } from '@/helpers/localActions';
import { useEffect } from 'react';
import { RootState } from '@/store/store';

const STORAGE_KEY = 'variables';

export const useVariable = () => {
  const dispatch = useDispatch();
  const variables = useSelector(
    (state: RootState) => state.variablesSlice.variables
  );

  useEffect(() => {
    const stored = getFromLocalStorage<{ [key: string]: string }>(STORAGE_KEY);
    if (stored && typeof stored === 'object') {
      Object.entries(stored).forEach(([key, value]) => {
        dispatch(setVariables({ key, value }));
      });
    }
  }, [dispatch]);

  const setVariable = (key: string, value: string) => {
    dispatch(setVariables({ key, value }));
  };

  const removeVariables = (key: string) => {
    dispatch(removeVariable(key));
  };

  const getVariable = (key: string) => {
    return variables[key] || '';
  };

  return {
    setVariable,
    getVariable,
    removeVariables,
    variables,
  };
};
