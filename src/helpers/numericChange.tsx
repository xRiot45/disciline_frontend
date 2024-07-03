import { ReactEventHandler } from 'react';

export const handleNumericChange = (
  e: React.ChangeEvent<HTMLInputElement> & ReactEventHandler<HTMLInputElement>
) => {
  const value = e.target.value;
  const numericValue = value.replace(/[^0-9]/g, '');
  e.target.value = numericValue;
};
