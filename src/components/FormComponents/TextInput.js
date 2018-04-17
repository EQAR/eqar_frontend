import React from 'react';
import classnames from 'classnames';
import {FormGroup, Label} from "reactstrap";

const InputFeedback = ({ error }) =>
  error ? (
    <small className="help-block form-text text-danger">{error}</small>
  ) : null;

const TextInput = ({
   type,
   id,
   label,
   error,
   value,
   onChange,
   className,
   ...props
}) => {
  const classes = classnames(
    'form-control',
    {
      'is-invalid': !!error,
    },
    className
  );
  return (
    <FormGroup>
      <Label htmlFor={id} error={error}>
        {label}
      </Label>
      <input
        id={id}
        className={classes}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      <InputFeedback error={error} />
    </FormGroup>
  );
};

export default TextInput;