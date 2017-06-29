import React from 'react';
import * as _ from 'lodash';

class FormControl extends React.Component {
  componentDidMount() {
    if (this.props.autoFocus) {
      this.component.focus();
    }
  }

  render() {
    const {
      id, label, type, input,
      prefix, suffix,
      hasLabel, readOnly,
      onKeyPress,
      onKeyUp,
      meta: { touched, error }
    } = this.props;
    const formGroupClass = !touched ? 'form-group' : `form-group ${error ? 'has-error' : 'has-success'}`;
    const formControlClass = type === 'number' ? 'form-control text-right' : 'form-control';

    if (type === 'checkbox') {
      return (
        <div className={formGroupClass}>
          <div className="checkbox" style={{ paddingTop: hasLabel ? 20 : 0 }}>
            <label htmlFor={id}>
              <input id={id} {...input} type="checkbox" disabled={readOnly} />
              {label}
            </label>
          </div>
          {touched && error && <span className="help-block">{error}</span>}
        </div>
      );
    } else if (type === 'radio') {
      return (
        <div className={formGroupClass}>
          <div className="radio" style={{ paddingTop: hasLabel ? 20 : 0 }}>
            <label htmlFor={id}>
              <input {...input} id={id} type="radio" />
              {label}
            </label>
          </div>
          {touched && error && <span className="help-block">{error}</span>}
        </div>
      );
    }
    const inputGroup = readOnly ?
      (
        <p style={type === 'hidden' ? { display: 'none' } : {}}>
          {_.isNumber(input.value) ? input.value.toLocaleString('en-US') : input.value}
        </p>
      )
      : (<input
        ref={(component) => {
          this.component = component;
        }}
        id={id} {...input} type={type}
        onKeyPress={onKeyPress}
        onKeyUp={onKeyUp}
        className={formControlClass} placeholder={label}
      />);

    return (
      <div className={formGroupClass}>
        {hasLabel && <label htmlFor={id} className="control-label">{label}</label>}
        {(prefix || suffix) ?
          <div className="input-group">
            {prefix}
            {inputGroup}
            {suffix}
          </div> :
          inputGroup
        }
        {touched && error && <span className="help-block">{error}</span>}
      </div>
    );
  }
}

FormControl.propTypes = {
  meta: React.PropTypes.object.isRequired,
  id: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  input: React.PropTypes.object.isRequired,
  prefix: React.PropTypes.element,
  suffix: React.PropTypes.element,
  hasLabel: React.PropTypes.bool,
  readOnly: React.PropTypes.bool,
  autoFocus: React.PropTypes.bool,
  onKeyPress: React.PropTypes.func,
  onKeyUp: React.PropTypes.func
};

export default FormControl;
