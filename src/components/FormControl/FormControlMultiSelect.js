import React from 'react';
import Select from 'react-select';

const FormControlMultiSelect = (props) => {
  const { id, label, input, hasLabel, meta: { touched, error }, onSelect, allowEmptyArray } = props;
  const formGroupClass = !touched ? 'form-group' : `form-group ${error ? 'has-error' : 'has-success'}`;

  return (
    <div className={formGroupClass}>
      {hasLabel && <label htmlFor={id} className="control-label">{label}</label>}
      <Select
        id={id} {...input} {...props}
        backspaceRemoves={false}
        placeholder={label}
        onChange={(value) => {
          input.onChange(value ? value.map((item) => item.value) : []);
          if (onSelect) {
            onSelect(value);
          }
        }}
        onBlur={() => {
          input.onBlur(input.value.value);
        }}
        multi
      />
      {touched && error && <span className="help-block">{error}</span>}
    </div>
  );
};

FormControlMultiSelect.propTypes = {
  meta: React.PropTypes.object.isRequired,
  id: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  input: React.PropTypes.object.isRequired,
  onSelect: React.PropTypes.func,
  options: React.PropTypes.array.isRequired,
  hasLabel: React.PropTypes.bool,
};

export default FormControlMultiSelect;
