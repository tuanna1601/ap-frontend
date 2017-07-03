import React from 'react';

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

class FormControlUpload extends React.Component {
  componentDidMount() {
    if (this.props.autoFocus) {
      this.component.focus();
    }
  }

  render() {
    const {
      id, label, input,
      prefix, suffix,
      hasLabel,
      meta: { touched, error }
    } = this.props;
    const formGroupClass = !touched ? 'form-group' : `form-group ${error ? 'has-error' : 'has-success'}`;
    const formControlClass = 'form-control text-right';
    delete input.value;

    const inputGroup = (
      <input
        type="file"
        ref={(component) => {
          this.component = component;
        }}
        id={id} {...input}
        className={formControlClass} placeholder={label}
        onChange={adaptFileEventToValue(input.onBlur)}
        onBlur={adaptFileEventToValue(input.onBlur)}
      />
    );

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

FormControlUpload.propTypes = {
  meta: React.PropTypes.object.isRequired,
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  input: React.PropTypes.object.isRequired,
  prefix: React.PropTypes.element,
  suffix: React.PropTypes.element,
  hasLabel: React.PropTypes.bool,
  autoFocus: React.PropTypes.bool,
  value: React.PropTypes.any
};

export default FormControlUpload;
