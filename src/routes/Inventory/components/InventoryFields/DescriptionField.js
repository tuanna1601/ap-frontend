import React, { PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';

import { FormControl } from '@/components/FormControl';
import ReviewFieldArray from './ReviewFieldArrayContainer';

const DescriptionField = ({ fields, department, form }) => (
  <tbody>
    <tr>
      <td>
        <h4 className="no-margin">Descriptions</h4>
      </td>
    </tr>
    {fields.map((description, index) => (
      <tr key={description}>
        <td>
          <Field
            type="text" component={FormControl}
            id={`${description}.text`}
            name={`${description}.text`}
            group={`${form}.descriptions`}
            index={index}
            label="Description"
            readOnly
          />
          <table className="table table-condensed table-striped table-bordered table-field-array">
            <thead>
              <tr>
                <th style={{ width: '45%' }}>Comment</th>
                <th style={{ width: '45%' }}>Criteria</th>
                <th style={{ width: '10%' }}>&nbsp;</th>
              </tr>
            </thead>
            <FieldArray name={`${description}.reviews`} department={department} component={ReviewFieldArray} />
          </table>
        </td>
      </tr>
    ))}
  </tbody>
);

DescriptionField.propTypes = {
  form: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  department: PropTypes.string.isRequired,
};

export default DescriptionField;
