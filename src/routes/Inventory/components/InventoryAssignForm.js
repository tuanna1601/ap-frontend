import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { chain } from 'lodash';
import Validator from '@/helpers/validator';
import { UserField } from '@/components/Field';

import { FormControl } from '@/components/FormControl';

class InventoryAssignForm extends Component {
  constructor(props) {
    super(props);

    this.renderStep = this.renderStep.bind(this);
    this.renderSteps = this.renderSteps.bind(this);
  }

  renderStep(step, index) {
    const { reviewingDepartment } = step;
    const department = {
      id: reviewingDepartment._id,
    };
    return (
      <tr key={index}>
        <td>
          {index + 1}
        </td>
        <td>
          <Field
            type="text" component={FormControl}
            id={`steps[${index}].title`} name={`steps[${index}].title`}
            label="Tên bước duyệt"
            readOnly
          />
        </td>
        <td>
          <Field
            type="text" component={FormControl}
            id={`steps[${index}].reviewingDepartment.name`}
            name={`steps[${index}].reviewingDepartment.name`}
            label="Đơn vị"
            readOnly
          />
        </td>
        <td>
          <UserField
            id={`steps[${index}].reviewer`} name={`steps[${index}].reviewer`}
            label="Người duyệt"
            userRole="reviewer"
            department={department}
            autoSelect={false}
          />
        </td>
      </tr>
    );
  }

  renderSteps() {
    const { steps } = this.props;

    return (
      <tbody>
        {chain(steps)
          .orderBy(['order', 'asc'])
          .map((step, index) => this.renderStep(step, index))
          .value()}
      </tbody>
    );
  }

  render() {
    const { handleSubmit, submitting, pristine, reset, form } = this.props;
    return (
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Field
              type="text" component={FormControl}
              id={`${form}.name`} name="name"
              label="Tên kho" hasLabel
              readOnly
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <table className="table table-condensed table-striped table-bordered table-field-array">
              <thead>
                <tr>
                  <th>Thứ tự</th>
                  <th>Tên bước</th>
                  <th>Đơn vị duyệt</th>
                  <th>Người duyệt</th>
                </tr>
              </thead>
              {this.renderSteps()}
            </table>
          </div>
        </div>
        <div className="button-list">
          <button className="btn btn-success btn-flat" type="submit" disabled={submitting}>
            <i className="fa fa-save" />
          </button>
          <button
            className="btn btn-default btn-flat" type="button"
            disabled={pristine || submitting} onClick={reset}
          >
            <i className="fa fa-undo" />
          </button>
        </div>
      </form>
    );
  }
}

InventoryAssignForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,

  form: PropTypes.string.isRequired,
  steps: PropTypes.array.isRequired,
  department: PropTypes.object.isRequired,
};

export default reduxForm({
  validate: values => ({
    userId: (new Validator(values.userId)).validateRequired().getMessage(),
  }),
})(InventoryAssignForm);
