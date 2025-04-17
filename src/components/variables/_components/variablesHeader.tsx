import Button from '@/UI/buttons/Button';
import { useLanguageContext } from '@/context/LanguageContext';
import styles from '../variablesContent.module.scss';
import { useDispatch } from 'react-redux';
import { clearVariable } from '@/store/slices/variablesSlice';

export const VariablesHeader = () => {
  const { t } = useLanguageContext();
  const dispatch = useDispatch();

  const onClearVariables = () => {
    dispatch(clearVariable());
  };

  return (
    <>
      <h2 className={styles.variablesTitle}>
        {t('variables.title') as string}
      </h2>
      <div className={styles.headerActions}>
        <Button
          className={styles.clearVariablesButton}
          text={t('variables.clearVariables') as string}
          onClick={onClearVariables}
        />
      </div>
    </>
  );
};
