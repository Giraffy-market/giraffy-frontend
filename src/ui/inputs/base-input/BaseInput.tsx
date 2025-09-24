import {
  type ChangeEvent,
  type ElementType,
  type FC,
  type InputHTMLAttributes,
  memo,
  useCallback,
  useState,
} from 'react';

import s from './styles/BaseInput.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  placeholder?: string;
  type?: string;
  Icon?: ElementType;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const BaseInput: FC<Props> = memo(
  ({ placeholder = '', type = 'text', Icon, value = '', onChange }) => {
    const [eyeClose, setEyeClose] = useState(false);
    const toggleEye = useCallback(() => setEyeClose((prev) => !prev), []);

    return (
      <div className={s.input__wrapper}>
        {Icon && (
          <button
            type="button"
            className={`${s.input__icon_wrapper} ${eyeClose && s.not_active}`}
            onClick={toggleEye}
          >
            <Icon className={s.input__icon} />
          </button>
        )}
        <input
          className={`${s.input} ${Icon && s.with_icon}`}
          type={eyeClose ? 'password' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  },
);

BaseInput.displayName = 'BaseInput';
