import React from 'react';
import Select from 'react-select';
import { Props } from './types';
import Chevron from '../../icons/Chevron';

import './index.scss';

const ReactSelect: React.FC<Props> = (props) => {
  const {
    className,
    showError = false,
    options,
    onChange,
    value,
    disabled = false,
    placeholder,
  } = props;

  const classes = [
    className,
    'react-select',
    showError && 'react-select--error',
  ].filter(Boolean).join(' ');

  return (
    <Select
      placeholder={placeholder}
      {...props}
      value={value}
      onChange={onChange}
      disabled={disabled ? 'disabled' : undefined}
      components={{ DropdownIndicator: Chevron }}
      className={classes}
      classNamePrefix="rs"
      options={options}
    />
  );
};

export default ReactSelect;
