import React from 'react';

// useTranslations returns a function that returns the key string
export const useTranslations = (_namespace?: string) => {
  return (key: string) => key;
};

// useLocale returns the default locale for tests
export const useLocale = () => 'vi';

// NextIntlClientProvider is a passthrough component
export const NextIntlClientProvider = ({
  children,
}: {
  children: React.ReactNode;
  locale?: string;
  messages?: Record<string, unknown>;
}) => React.createElement(React.Fragment, null, children);
