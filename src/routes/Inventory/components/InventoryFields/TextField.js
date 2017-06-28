import React, { PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';

import { FormControl } from '@/components/FormControl';
import ReviewFieldArray from './ReviewFieldArrayContainer';

const TextField = ({ form, department }) => (
  <tbody>
    <tr>
      <td>
        <Field
          type="text" component={FormControl}
          id={'text.text'}
          name={'text.text'}
          group={`${form}.text`}
          label="Text"
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
          <FieldArray name={'text.reviews'} department={department} component={ReviewFieldArray} />
        </table>
      </td>
    </tr>
  </tbody>
);

TextField.propTypes = {
  form: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
};

export default TextField;
