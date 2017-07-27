import React, { Component, PropTypes } from 'react';

class FormControlCheckboxGroup extends Component {

  field = ({ input, meta, options, label }) => {
    const { name, onChange, onBlur, onFocus } = input;
    const { touched, error } = meta;
    const inputValue = input.value;
    const formGroupClass = !touched ? 'form-group' : `form-group ${error ? 'has-error' : 'has-success'}`;

    const checkboxes = options.map((option, index) => {
      const handleChange = (event) => {
        const arr = [...inputValue];
        if (event.target.checked) {
          arr.push(option.value);
        } else {
          arr.splice(arr.indexOf(option.value), 1);
        }
        onBlur(arr);
        return onChange(arr);
      };
      const checked = inputValue.includes(option.value);
      return (
        <div className="checkbox" key={`checkbox-${index}`}>
          <label htmlFor={`${name}[${index}]`}>
            <input
              type="checkbox"
              name={`${name}[${index}]`}
              id={`${name}[${index}]`}
              value={option.value} checked={checked}
              onChange={handleChange}
              onFocus={onFocus}
            />
            <span>{option.label}</span>
          </label>
        </div>
      );
    });

    return (
      <div className={formGroupClass}>
        <label htmlFor={name}>
          {label}
        </label>
        <div>{checkboxes}</div>
        {touched && error && <span className="help-block">{error}</span>}
      </div>
    );
  };

  render() {
    return this.field(this.props);
  }
}

FormControlCheckboxGroup.propTypes = {
  meta: PropTypes.object.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  prefix: PropTypes.element,
  suffix: PropTypes.element,
  hasLabel: PropTypes.bool,
  readOnly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func
};

export default FormControlCheckboxGroup;
