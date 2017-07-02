import React, { PropTypes } from 'react';
import { Field } from 'redux-form';

import { FormControl } from '@/components/FormControl';
import { CriteriaField } from '@/components/Field';

const ReviewFieldArray = ({ fields, onFieldArrayRemove, department, isUpdate }) => (
  <tbody>
    {fields.map((review, index) =>
      <tr key={review}>
        <td>
          <Field
            type="text" component={FormControl}
            id={`${review}.comment`}
            name={`${review}.comment`}
            index={index}
            label="Review"
            readOnly={isUpdate}
          />
        </td>
        <td>
          <CriteriaField
            id={`${review}.criteria`}
            name={`${review}.criteria`}
            department={department}
            index={index}
            label="Tiêu chí"
            autoSelect={false}
            disabled={isUpdate}
          />
        </td>
        <td className="text-center">
          {!isUpdate &&
            <button
              className="btn btn-xs btn-flat btn-danger" type="button"
              onClick={() => onFieldArrayRemove(fields, index)}
            >
              <i className="fa fa-trash" />
            </button>
          }
        </td>
      </tr>
    )}
    {!isUpdate &&
      <tr className="button-list">
        <td colSpan={3}>
          <button
            className="btn btn-xs btn-flat btn-success" type="button"
            onClick={() => fields.push()}
          >
            <i className="fa fa-fw fa-plus" />
          </button>
        </td>
      </tr>
    }
  </tbody>
);

ReviewFieldArray.propTypes = {
  fields: PropTypes.object.isRequired,
  department: PropTypes.string.isRequired,
  isUpdate: PropTypes.bool,
  onFieldArrayRemove: PropTypes.func.isRequired
};

export default ReviewFieldArray;
