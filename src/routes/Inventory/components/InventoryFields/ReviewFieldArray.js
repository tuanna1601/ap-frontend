import React, { PropTypes } from 'react';
import { Field } from 'redux-form';

import { FormControl } from '@/components/FormControl';
import { CriteriaField } from '@/components/Field';

const ReviewFieldArray = ({ reviewed, fields, reviews, onFieldArrayRemove, isUpdate, criteria }) => (
  <tbody>
    {fields.map((review, index) =>
      <tr key={review}>
        <td>
          <CriteriaField
            id={`${review}.criteria`}
            name={`${review}.criteria`}
            criteria={criteria}
            index={index}
            label="Tiêu chí"
            autoSelect={false}
            disabled={isUpdate || !!(reviews[index] && reviews[index]._id)}
          />
        </td>
        <td>
          <Field
            type="text" component={FormControl}
            id={`${review}.comment`}
            name={`${review}.comment`}
            index={index}
            label="Review"
            readOnly={isUpdate || !!(reviews[index] && reviews[index]._id)}
          />
        </td>
        <td className="text-center">
          {!isUpdate && !(reviews[index] && reviews[index]._id) &&
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
    {!isUpdate && !reviewed &&
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
  reviews: PropTypes.array.isRequired,
  criteria: PropTypes.array,
  isUpdate: PropTypes.bool,
  reviewed: PropTypes.bool,
  onFieldArrayRemove: PropTypes.func.isRequired
};

export default ReviewFieldArray;
