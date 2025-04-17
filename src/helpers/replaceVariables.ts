export const replaceVariables = (
    input: string,
    variables: { key: string; value: string }[]
  ): string => {
    let result = input;
    variables.forEach(({ key, value }) => {
      const pattern = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(pattern, value);
    });
    return result;
  };
  