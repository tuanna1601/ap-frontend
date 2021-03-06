import React, { PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';

import { FormControlTextArea } from '@/components/FormControl';
import ReviewFieldArray from './ReviewFieldArrayContainer';

const TextField = ({ form, department, isUpdate, criteria }) => (
  <tbody>
    <tr>
      <td>
        <Field
          type="text" component={FormControlTextArea}
          id={'text.text'} name={'text.text'}
          group={`${form}.text`} label="Text"
          readOnly={!isUpdate} rows={20}
        />
        {!isUpdate &&
          <table className="table table-condensed table-striped table-bordered table-field-array">
            <thead>
              <tr>
                <th style={{ width: '45%' }}>Criteria</th>
                <th style={{ width: '45%' }}>Comment</th>
                <th style={{ width: '10%' }}>&nbsp;</th>
              </tr>
            </thead>
            <FieldArray
              department={department}
              criteria={criteria}
              component={ReviewFieldArray}
              form={form}
              name={'text.oldReviews'}
              isUpdate
            />
            <FieldArray
              department={department}
              criteria={criteria}
              component={ReviewFieldArray}
              form={form}
              name={'text.reviews'}
            />
          </table>
        }
        {isUpdate &&
          <table className="table table-condensed table-striped table-bordered table-field-array">
            <thead>
              <tr>
                <th style={{ width: '45%' }}>Criteria</th>
                <th style={{ width: '45%' }}>Comment</th>
                <th style={{ width: '10%' }}>&nbsp;</th>
              </tr>
            </thead>
            <FieldArray
              department={department}
              criteria={criteria}
              component={ReviewFieldArray}
              form={form}
              name={'text.oldReviews'}
              isUpdate={isUpdate}
            />
          </table>
        }
      </td>
    </tr>
  </tbody>
);

TextField.propTypes = {
  text: PropTypes.object,
  form: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  criteria: PropTypes.array.isRequired,
  isUpdate: PropTypes.bool,
};

export default TextField;
