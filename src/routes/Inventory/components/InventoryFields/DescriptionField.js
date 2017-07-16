import React, { PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';

import { FormControl } from '@/components/FormControl';
import ReviewFieldArray from './ReviewFieldArrayContainer';

class DescriptionField extends React.Component {
  constructor(props) {
    super(props);

    this.renderDescription = this.renderDescription.bind(this);
  }

  renderDescription(fields, description, index) {
    const { department, form, descriptions, isUpdate, onFieldArrayRemove } = this.props;
    const reviews = descriptions && descriptions[index] ? descriptions[index].reviews : [];
    return (
      <tr key={description}>
        <td style={{ width: '90%' }}>
          <Field
            type="text" component={FormControl}
            id={`${description}.text`}
            name={`${description}.text`}
            group={`${form}.descriptions`}
            index={index}
            label="Description"
            readOnly={!!(descriptions[index] && descriptions[index]._id)}
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
                name={`${description}.reviews`}
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
                name={`${description}.reviews`}
                component={ReviewFieldArray}
                isUpdate={isUpdate}
              />
            </table>
          }
        </td>
        <td className="text-center">
          {isUpdate && !(descriptions[index] && descriptions[index]._id) &&
            <button
              className="btn btn-xs btn-flat btn-danger" type="button"
              onClick={() => onFieldArrayRemove(fields, index)}
            >
              <i className="fa fa-trash" />
            </button>
          }
        </td>
      </tr>
    );
  }

  render() {
    const { fields, descriptions, isUpdate } = this.props;
    return (
      <tbody>
        {descriptions && fields.map((description, index) => this.renderDescription(fields, description, index))}
        {isUpdate &&
          <tr className="button-list">
            <td colSpan={2}>
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
  }
}

DescriptionField.propTypes = {
  form: PropTypes.string.isRequired,
  descriptions: PropTypes.array,
  fields: PropTypes.object.isRequired,
  department: PropTypes.string.isRequired,
  isUpdate: PropTypes.bool,
  onFieldArrayRemove: PropTypes.func.isRequired,
};

export default DescriptionField;
