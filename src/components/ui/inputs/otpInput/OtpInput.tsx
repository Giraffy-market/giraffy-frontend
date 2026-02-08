'use client';

import {
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
  useRef,
} from 'react';

import cn from 'classnames';

import './styles/OtpInputs.scss';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  isInvalid?: boolean;
}

export const OtpInput = ({
  length = 4,
  value,
  onChange,
  isInvalid,
}: OtpInputProps) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const otpArray = value
    .split('')
    .concat(Array(length).fill(''))
    .slice(0, length);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/\D/g, '');
    if (!val) return;

    const newOtp = [...otpArray];
    newOtp[index] = val.substring(val.length - 1);
    const combinedValue = newOtp.join('');
    onChange(combinedValue);
    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!otpArray[index] && index > 0) {
        const newOtp = [...otpArray];
        newOtp[index - 1] = '';
        onChange(newOtp.join(''));
        inputsRef.current[index - 1]?.focus();
      } else {
        const newOtp = [...otpArray];
        newOtp[index] = '';
        onChange(newOtp.join(''));
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const data = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, length);

    if (data) {
      onChange(data);
      const lastIndex = Math.min(data.length, length - 1);
      inputsRef.current[lastIndex]?.focus();
    }
  };
  return (
    <div
      className={cn('otp-container', { 'otp-container--invalid': isInvalid })}
    >
      {otpArray.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="otp-input-field"
        />
      ))}
    </div>
  );
};
