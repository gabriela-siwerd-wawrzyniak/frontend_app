import React from 'react';

import styles from 'components/forms/Input.module.scss';

type InputProps = {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
};

const Input = ({ id, type, placeholder, value, onChange, error, disabled }: InputProps) => {
  return (
    <div className={styles['input-container']}>
      <label htmlFor={id} className={styles['hidden']}>{placeholder}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={`${id}-error`}
        disabled={disabled}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className={styles['error']}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;