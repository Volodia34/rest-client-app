export const replaceVariables = (
  input: string,
  variables: { [key: string]: string }
): string => {
  return input.replace(/{{(.*?)}}/g, (_, key) => {
    return variables[key] ?? `{{${key}}}`;
  });
};

export const isVariables = (input: string): boolean => {
  const regex = /{{(.*?)}}/g;
  return regex.test(input);
};
