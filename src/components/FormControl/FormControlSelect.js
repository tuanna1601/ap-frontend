import React from 'react';
import Select from 'react-select';

function getStringValue(value) {
  return value ? value.value : '';
}

function handleCallback(cb, value) {
  if (cb) {
    cb(value);
  }
}

class FormControlSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialValue: true,
    };
  }

  componentDidMount() {
    const { input, options, onSelect, autoSelect = true, autoFocus } = this.props;

    if (autoSelect && this.state.initialValue && options.length >= 1) {
      if (!input.value || options.length === 1) {
        input.onChange(getStringValue(options[0]));
        handleCallback(onSelect, options[0]);
      }
    }

    if (autoFocus && this.component) {
      this.component.focus();
    }
  }

  /*
   * If there is only option and run only once to avoid duplicated calls and allow deleting initialValue
   */
  componentWillReceiveProps(nextProps) {
    const { input, options, onSelect, autoSelect = true } = nextProps;

    if (autoSelect && this.state.initialValue && options.length >= 1) {
      if (!input.value || options.length === 1) {
        input.onChange(getStringValue(options[0]));
        handleCallback(onSelect, options[0]);
      }

      this.setState({
        initialValue: false,
      });
    }
  }

  render() {
    const { id, label, input, hasLabel, meta: { touched, error }, onSelect } = this.props;
    const formGroupClass = !touched ? 'form-group' : `form-group ${error ? 'has-error' : 'has-success'}`;

    return (
      <div className={formGroupClass}>
        {hasLabel && <label htmlFor={id} className="control-label">{label}</label>}
        <Select
          ref={(component) => this.component = component}
          id={id} {...input} {...this.props}
          backspaceRemoves={false}
          placeholder={label}
          onChange={(value) => {
            const selected = getStringValue(value);
            input.onChange(selected);
            handleCallback(onSelect, value);
          }}
          onBlur={() => {
            input.onBlur(input.value.value);
          }}
        />
        {touched && error && <span className="help-block">{error}</span>}
      </div>
    );
  }
}

FormControlSelect.propTypes = {
  meta: React.PropTypes.object.isRequired,
  id: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  input: React.PropTypes.object.isRequired,
  options: React.PropTypes.array.isRequired,
  onSelect: React.PropTypes.func,
  hasLabel: React.PropTypes.bool,
  autoSelect: React.PropTypes.bool,
  autoFocus: React.PropTypes.bool,
};

export default FormControlSelect;
