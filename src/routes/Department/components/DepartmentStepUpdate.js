import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { map } from 'lodash';

import Validator from '@/helpers/validator';
import { DepartmentField, CriteriaListField } from '@/components/Field';
import { FormControl, FormControlSelect } from '@/components/FormControl';

import DepartmentCriteriaFilter from './DepartmentCriteriaFilterContainer';

const clearanceTypes = [{
  value: 'accepted',
  label: 'Chấp nhận',
}, {
  value: 'rejected',
  label: 'Từ chối',
}];

const generateCriteriaOptions = (criteria) => map(criteria, item => ({
  value: item.id,
  label: item.name,
  item,
}));

const DepartmentStepUpdate = ({ form, handleSubmit, submitting, criteria }) => (
  <form className="modal-form" onSubmit={handleSubmit}>
    <div className="row">
      <div className="col-md-6">
        <DepartmentField
          name="department"
          id="department"
          label="Đơn vị"
          hasLabel
          disabled
        />
        <Field
          type="text"
          component={FormControl}
          name="title"
          id="title"
          label="Tên"
          hasLabel
        />
        <DepartmentField
          name="reviewingDepartment"
          id="reviewingDepartment"
          label="Đơn vị duyệt"
          hasLabel
        />
        <Field
          type="number"
          component={FormControl}
          name="autoClearanceAfter"
          id="autoClearanceAfter"
          suffix={<span className="input-group-addon">ngày</span>}
          label="Tự động xử lý sau"
          hasLabel
        />
        <Field
          component={FormControlSelect}
          name="autoClearanceType"
          id="autoClearanceType"
          options={clearanceTypes}
          label="Hình thức xử lý"
          hasLabel
        />
        <Field
          type="checkbox"
          name="notification"
          component={FormControl}
          id="notification"
          label="Gửi thông báo hay không"
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="criteria" className="control-label">
          Bộ tiêu chí của bước duyệt
        </label>
        <DepartmentCriteriaFilter />
        <CriteriaListField
          name="criteria"
          id={`${form}.criteria`}
          label="Danh sách tiêu chí"
          options={generateCriteriaOptions(criteria)}
        />
      </div>
    </div>
    <div>
      <button type="submit" className="btn btn-success btn-flat" disabled={submitting}>
        <i className="fa fa-save" />
      </button>
    </div>
  </form>
);

DepartmentStepUpdate.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  form: PropTypes.string.isRequired,
  criteria: PropTypes.array.isRequired,
};

export default reduxForm({
  validate: values => ({
    title: (new Validator(values.title)).validateRequired().getMessage(),
  }),
})(DepartmentStepUpdate);
