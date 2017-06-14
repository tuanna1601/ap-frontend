import React from 'react';

class FormControlTextArea extends React.Component {
  componentDidMount() {
    if (this.props.autoFocus) {
      this.component.focus();
    }
  }

  render() {
    const {
      id, label, input, rows = 5,
      hasLabel, readOnly,
      meta: { touched, error }
    } = this.props;
    const formGroupClass = !touched ? 'form-group' : `form-group ${error ? 'has-error' : 'has-success'}`;

    return (
      <div className={formGroupClass}>
        {hasLabel && <label htmlFor={id} className="control-label">{label}</label>}
        <textarea
          readOnly={readOnly}
          ref={(component) => {
            this.component = component;
          }}
          id={id} {...input} className="form-control" rows={rows}
          placeholder={label}
        >{input.value}</textarea>
        {touched && error && <span className="help-block">{error}</span>}
      </div>
    );
  }
}

FormControlTextArea.propTypes = {
  meta: React.PropTypes.object.isRequired,
  id: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  input: React.PropTypes.object.isRequired,
  rows: React.PropTypes.number,
  hasLabel: React.PropTypes.bool,
  readOnly: React.PropTypes.bool,
  autoFocus: React.PropTypes.bool,
};

export default FormControlTextArea;
