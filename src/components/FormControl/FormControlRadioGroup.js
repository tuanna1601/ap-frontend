import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

class FormControlRadioGroup extends Component {
  componentDidMount() {
    if (this.props.autoFocus) {
      this.component.focus();
    }
  }

  render() {
    const {
      name, label, input, options,
      meta: { touched, error }
    } = this.props;
    const formGroupClass = !touched ? 'form-group' : `form-group ${error ? 'has-error' : 'has-success'}`;


    return (
      <div className={formGroupClass}>
        <label htmlFor={name}>
          {label}
        </label>
        <div className="radio">
          {map(options, (option, index) => (
            <label key={index} style={{ paddingLeft: '22px' }} htmlFor={`${name}[${index}]`}>
              <div className="radio-wrapper">
                <input
                  type="radio"
                  {...input}
                  name={name}
                  id={`${name}[${index}]`}
                  value={option.value}
                />
                {option.label}
              </div>
            </label>
          ))}
        </div>
        {touched && error && <span className="help-block">{error}</span>}
      </div>
    );
  }
}

FormControlRadioGroup.propTypes = {
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

export default FormControlRadioGroup;
