import {
  type ChangeEventHandler,
  type ElementType,
  type FC,
  type InputHTMLAttributes,
  memo,
  useCallback,
  useState,
} from 'react';

import s from './styles/BaseInput.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  Icon?: ElementType;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export const BaseInput: FC<Props> = memo(
  ({ Icon, value = '', onChange, ...props }) => {
    return (
      <div className={s.input__wrapper}>
        {Icon && <Icon className={s.icon} />}

        <input
          className={`${s.input} ${Icon && s.with_icon}`}
          // type={eyeClose ? 'password' : type}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    );
  },
);

BaseInput.displayName = 'BaseInput';

const PasswordInput: FC = () => {
  const [eyeClose, setEyeClose] = useState(false);
  const toggleEye = useCallback(() => setEyeClose((prev) => !prev), []);

  return <BaseInput type={eyeClose ? 'text' : 'password'} />;
};
