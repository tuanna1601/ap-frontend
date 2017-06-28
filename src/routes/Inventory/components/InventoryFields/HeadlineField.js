import React, { PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';

import { FormControl } from '@/components/FormControl';
import ReviewFieldArray from './ReviewFieldArrayContainer';

const HeadlineField = ({ fields, department, form }) => (
  <tbody>
    <tr>
      <td>
        <h4 className="no-margin">Headlines</h4>
      </td>
    </tr>
    {fields.map((headline, index) => (
      <tr key={headline}>
        <td>
          <Field
            type="text" component={FormControl}
            id={`${headline}.text`}
            name={`${headline}.text`}
            group={`${form}.headlines`}
            index={index}
            label="Headline"
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
            <FieldArray name={`${headline}.reviews`} department={department} component={ReviewFieldArray} />
          </table>
        </td>
      </tr>
    ))}
  </tbody>
);

HeadlineField.propTypes = {
  form: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  department: PropTypes.string.isRequired,
};

export default HeadlineField;
