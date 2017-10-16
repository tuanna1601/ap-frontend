import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { debounce } from 'lodash';

import { FormControl } from '@/components/FormControl';
import { DepartmentField } from '@/components/Field';

class DepartmentCriteriaFilter extends Component {
  constructor(props) {
    super(props);

    this.onKeyUp = this.onKeyUp.bind(this);
    this.handleKeyUp = debounce(this.handleKeyUp, 500);
  }

  onKeyUp(event) {
    event.persist();
    this.handleKeyUp(event.target.value);
  }

  handleKeyUp(value) {
    const { getCriteria, department } = this.props;
    getCriteria({
      department,
      name: value
    });
  }

  render() {
    const { getCriteria, form, name } = this.props;
    return (
      <div className="row">
        <div className="col-md-6">
          <DepartmentField
            id={`${form}.department`} name={`${form}.department`}
            label="Đơn vị"
            hasRoot
            onSelect={(option) => getCriteria({
              name,
              department: option ? option.value : '',
            })}
          />
        </div>
        <div className="col-md-6">
          <Field
            type="text" component={FormControl}
            id={`${form}.name`} name={`${form}.name`}
            label="Tên tiêu chí"
            onKeyUp={this.onKeyUp}
          />
        </div>
      </div>
    );
  }
}

DepartmentCriteriaFilter.propTypes = {
  form: PropTypes.string.isRequired,

  department: PropTypes.string,
  name: PropTypes.string,

  getCriteria: PropTypes.func.isRequired,
};

export default DepartmentCriteriaFilter;
