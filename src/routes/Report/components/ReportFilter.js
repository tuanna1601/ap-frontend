import React, { PropTypes } from 'react';

import { reduxForm, Field } from 'redux-form';

import { FormControlDatePicker } from '@/components/FormControl';
import { DepartmentField } from '@/components/Field';

const ReportFilter = ({ handleSubmit, submitting }) => (
  <form onSubmit={handleSubmit} className="box-filter">
    <div className="row">
      <div className="col-md-3">
        <Field
          type="text"
          component={FormControlDatePicker}
          name="startDate"
          id="startDate"
          label="Ngày bắt đầu"
        />
      </div>
      <div className="col-md-3">
        <Field
          type="text"
          component={FormControlDatePicker}
          name="enDate"
          id="enDate"
          label="Ngày kết thúc"
        />
      </div>
      <div className="col-md-3">
        <DepartmentField
          name="department"
          id="department"
          label="Đơn vị"
        />
      </div>
      <div className="col-md-2">
        <button
          className="btn btn-default btn-flat"
          type="submit" title="Lọc"
          disabled={submitting}
        >
          <i className="fa fa-search" />
        </button>
      </div>
    </div>
  </form>
);

ReportFilter.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

export default reduxForm()(ReportFilter);
