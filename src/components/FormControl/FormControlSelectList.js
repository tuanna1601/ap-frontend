import React, { Component, PropTypes } from 'react';
import { cloneDeep, findIndex, isEqual, map, remove, union } from 'lodash';

class FormControlSelectList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOptions: [],
    };

    this.handleSelectOption = this.handleSelectOption.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleAddOptions = this.handleAddOptions.bind(this);
    this.renderOptionField = this.renderOptionField.bind(this);
    this.renderInputValue = this.renderInputValue.bind(this);
    this.handleRemoveValue = this.handleRemoveValue.bind(this);
  }

  handleSelectOption(event, option) {
    const index = findIndex(this.state.selectedOptions, (item) => isEqual(item, option));
    if (index !== -1) {
      const arr = cloneDeep(this.state.selectedOptions);
      remove(arr, (item, i) => i === index);
      this.setState({
        selectedOptions: arr,
      });
    } else {
      this.setState({
        selectedOptions: union(this.state.selectedOptions, [option]),
      });
    }
  }

  handleSelectAll(event) {
    if (event.target.checked) {
      this.setState({
        selectedOptions: map(this.props.options, option => option),
      });
    } else {
      this.setState({
        selectedOptions: [],
      });
    }
  }

  handleAddOptions() {
    const { input: { onBlur, value } } = this.props;
    const newValue = union(this.state.selectedOptions, value);
    onBlur(newValue);
    this.setState({ selectedOptions: [] });
  }

  handleRemoveValue(index) {
    const { input: { onBlur, value } } = this.props;
    const arr = cloneDeep(value);
    remove(arr, (item, i) => i === index);
    onBlur(arr);
  }

  renderOptionField() {
    const { options, input, id } = this.props;
    const { name } = input;
    const isChecked = (option) => {
      const index = findIndex(this.state.selectedOptions, item => isEqual(item, option));
      if (index !== -1) {
        return true;
      }
      return false;
    };
    const checkboxes = map(options, (option, index) => (
      <div key={index} className="checkbox">
        <label htmlFor={`${id}-option-${index}`}>
          <input
            type="checkbox"
            name={`${name}-option-${index}`}
            id={`${id}-option-${index}`}
            onChange={(event) => this.handleSelectOption(event, option)}
            checked={isChecked(option)}
          />
          <span>{option.label}</span>
        </label>
      </div>
    ));

    return (
      <div>
        <div className="checkbox">
          <label htmlFor={`${id}-option-all`}>
            <input
              type="checkbox"
              name={`${name}-option-all`}
              id={`${id}-option-all`}
              onChange={event => this.handleSelectAll(event)}
              checked={options.length
                && this.state.selectedOptions.length === options.length}
            />
            <span>Chọn tất cả</span>
          </label>
        </div>
        {checkboxes}
      </div>
    );
  }

  renderInputValue() {
    const { input: { value } } = this.props;
    return (
      <table style={{ width: '100%' }}>
        <tbody>
          {map(value, (option, index) => (
            <tr key={index}>
              <td style={{ width: '90%' }}>
                {option.label}
              </td>
              <td>
                <i
                  style={{ cursor: 'pointer' }}
                  className="fa fa-minus-circle text-danger"
                  onClick={() => this.handleRemoveValue(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="select-list-wrapper">
        <div className="row">
          <div className="col-md-6">
            {this.renderOptionField()}
            <button
              type="button"
              className="btn btn-xs btn-success"
              onClick={() => this.handleAddOptions()}
            >
              Thêm
            </button>
          </div>
          <div className="col-md-6">
            {this.renderInputValue()}
          </div>
        </div>
      </div>
    );
  }
}

FormControlSelectList.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
};

export default FormControlSelectList;
