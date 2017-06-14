import React from 'react';
import MaskedInput from 'react-text-mask';
import moment from 'moment';

function createAutoCorrectedDatetimePipeline(dateFormat = 'DD-MM-YYYY') {
  return function(conformedValue) {
    const indexesOfPipedChars = [];
    const dateFormatArray = dateFormat.split(/[^DMYHms]+/);
    const maxValue = { DD: 31, MM: 12, YYYY: 9999, HH: 23, mm: 59, ss: 59 };
    const minValue = { DD: 1, MM: 1, YYYY: 1, HH: 0, mm: 0, ss: 0 };
    const conformedValueArr = conformedValue.split('');

    // Check first digit
    dateFormatArray.forEach((format) => {
      const position = dateFormat.indexOf(format);
      const maxFirstDigit = parseInt(maxValue[format].toString().substr(0, 1), 10);

      if (parseInt(conformedValueArr[position], 10) > maxFirstDigit) {
        conformedValueArr[position + 1] = conformedValueArr[position];
        conformedValueArr[position] = 0;
        indexesOfPipedChars.push(position);
      }
    });

    // Check for invalid date
    const isInvalid = dateFormatArray.some((format) => {
      const position = dateFormat.indexOf(format);
      const length = format.length;
      const textValue = conformedValue.substr(position, length).replace(/\D/g, '');
      const value = parseInt(textValue, 10);

      return value > maxValue[format] || (textValue.length === length && value < minValue[format]);
    });

    if (isInvalid) {
      return false;
    }

    return {
      value: conformedValueArr.join(''),
      indexesOfPipedChars,
    };
  };
}

class FormControlDatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.dateFormat = this.props.dateFormat || 'DD-MM-YYYY';
  }

  handleBlur(event) {
    const value = event.target.value;
    if (!value) {
      this.props.input.onBlur('');
    } else {
      const now = moment().format('DD-MM-YYYY HH:mm');
      const formattedValue = [];
      for (let i = 0, len = value.length; i < len; i++) {
        formattedValue.push(value[i] === '_' ? now[i] : value[i]);
      }

      const tmp = moment(formattedValue.join(''), this.dateFormat, true).isValid()
        ? moment(formattedValue.join(''), this.dateFormat)
        : moment();

      if (this.dateFormat.indexOf('HH') < 0) {
        this.props.input.onBlur(tmp.endOf('day').toISOString());
      } else {
        this.props.input.onBlur(tmp.toISOString());
      }
    }
  }

  handleChange(event) {
    const value = event.target.value;
    if (!value) {
      this.props.input.onBlur('');
    } else if (moment(value, this.dateFormat, true).isValid()) {
      if (this.dateFormat.indexOf('HH') < 0) {
        this.props.input.onBlur(moment(value, this.dateFormat).endOf('day').toISOString());
      } else {
        this.props.input.onBlur(moment(value, this.dateFormat).toISOString());
      }
    }
  }

  render() {
    const { id, label, input, hasLabel, meta: { touched, error }, prefix, suffix, dateReadOnly } = this.props;

    const formGroupClass = !touched ? 'form-group' : `form-group ${error ? 'has-error' : 'has-success'}`;
    const autoCorrectedDatePipe = createAutoCorrectedDatetimePipeline(this.dateFormat);

    const mask = this.dateFormat === 'DD-MM-YYYY'
    ? [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    : [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/];

    const dateGroup = (
      <div>
        <MaskedInput
          id={id} placeholder={`${this.dateFormat} (${label})`}
          type="text" className="form-control"
          placeholderChar="_"
          keepCharPositions
          value={input.value ? moment(input.value).format(this.dateFormat) : ''}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          mask={mask}
          pipe={autoCorrectedDatePipe}
          readOnly={dateReadOnly}
        />
        <input type="hidden" {...input} />
      </div>
    );

    return (
      <div className={formGroupClass}>
        {hasLabel && <label htmlFor={id} className="control-label">{label}</label>}
        {(prefix || suffix) ?
          <div className="input-group">
            {prefix}
            {dateGroup}
            {suffix}
          </div> :
          dateGroup
        }
        {touched && error && <span className="help-block">{error}</span>}
      </div>
    );
  }
}

FormControlDatePicker.propTypes = {
  meta: React.PropTypes.object.isRequired,
  id: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  input: React.PropTypes.object.isRequired,
  hasLabel: React.PropTypes.bool,
  suffix: React.PropTypes.element,
  prefix: React.PropTypes.element,
  dateFormat: React.PropTypes.string,
  dateReadOnly: React.PropTypes.bool
};

export default FormControlDatePicker;
