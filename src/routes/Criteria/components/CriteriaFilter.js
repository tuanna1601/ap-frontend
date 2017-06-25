import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import { FormControl } from '@/components/FormControl';
import { DepartmentField } from '@/components/Field';

class CriteriaForm extends Component {
  componentDidMount() {
    this.props.onComponentMounted();
  }

  render() {
    const { handleSubmit, form } = this.props;
    return (
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <DepartmentField
              id={`${form}.department`} name="department"
              label="Đơn vị"
              hasRoot
            />
          </div>
          {/* <div className="col-md-4">
            <Field
              type="text" component={FormControl}
              id={`${form}.name`} name="name"
              label="Tên tiêu chí"
            />
          </div>*/}
          <div className="col-md-2">
            <button className="btn btn-default btn-flat" type="submit" title="Lọc" disabled={this.props.submitting}>
              <i className="fa fa-search" />
            </button>
          </div>
        </div>
      </form>
    );
  }
}

CriteriaForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  form: PropTypes.string.isRequired,

  onComponentMounted: PropTypes.func.isRequired
};

export default reduxForm()(CriteriaForm);
