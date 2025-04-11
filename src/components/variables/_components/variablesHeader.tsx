import Button from '@/UI/buttons/Button';
import { useLanguageContext } from '@/context/LanguageContext';
import styles from '../variablesContent.module.scss';
import { VariablesHeaderProps } from '../../../types/variables';

export const VariablesHeader = ({ onClearVariables }: VariablesHeaderProps) => {
  const { t } = useLanguageContext();

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
