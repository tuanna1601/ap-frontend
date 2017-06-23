import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import { FormControlSelect } from '@/components/FormControl';
import * as _ from 'lodash';

export default class DepartmentField extends Component {
  componentDidMount() {
    this.props.listDepartments();
  }

  render() {
    const options = [];
    if (this.props.hasRoot) {
      options.push({
        value: '',
        label: '/',
      });
    }
    _.each(this.props.departments, (department) => {
      options.push({
        value: department.id,
        label: department.name
      });
    });

    const filteredOptions = _.filter(options, (option) => {
      if (this.props.leavesOnly) {
        return option.hasChildren === false;
      }
      return true;
    });

    return (
      <Field component={FormControlSelect} options={filteredOptions} {...this.props} />
    );
  }
}

DepartmentField.propTypes = {
  listDepartments: PropTypes.func.isRequired,
  departments: PropTypes.array.isRequired,
  hasRoot: PropTypes.bool,
  leavesOnly: PropTypes.bool,
};
