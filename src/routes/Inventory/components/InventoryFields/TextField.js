import React, { PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';

import { FormControlTextArea } from '@/components/FormControl';
import ReviewFieldArray from './ReviewFieldArrayContainer';

const TextField = ({ form, department, text, isUpdate }) => {
  const reviews = text ? text.reviews : [];
  return (
    <tbody>
      <tr>
        <td>
          <Field
            type="text" component={FormControlTextArea}
            id={'text.text'}
            name={'text.text'}
            group={`${form}.text`}
            label="Text"
            readOnly={!isUpdate}
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
                name={'text.reviews'}
                component={ReviewFieldArray}
              />
            </table>
          }
          {isUpdate && reviews && reviews.length > 0 &&
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
                name={'text.reviews'}
                component={ReviewFieldArray}
                isUpdate={isUpdate}
              />
            </table>
          }
        </td>
      </tr>
    </tbody>
  );
};

TextField.propTypes = {
  text: PropTypes.object,
  form: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  isUpdate: PropTypes.bool,
};

export default TextField;
