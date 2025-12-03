import type { FC } from 'react';

import { BaseInput } from '../baseInput/BaseInput';
import type { NumberInputProps } from '../types';

export const NumberInput: FC<NumberInputProps> = ({ ...props }) => {
  return <BaseInput {...props} type="number" />;
};
