import md5 from 'md5';

const baseUrl = 'https://www.gravatar.com/avatar/';

export const gravatar = (email: string): string => {
  const hash = md5(email.trim().toLowerCase());
  return `${baseUrl}${hash}.jpg?d=identicon`;
};
