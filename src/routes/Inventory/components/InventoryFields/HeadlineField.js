import React, { PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';

import { FormControl } from '@/components/FormControl';
import ReviewFieldArray from './ReviewFieldArrayContainer';

class HeadlineField extends React.Component {
  constructor(props) {
    super(props);

    this.renderHeadline = this.renderHeadline.bind(this);
  }

  renderHeadline(fields, headline, index) {
    const { department, form, headlines, isUpdate, onFieldArrayRemove } = this.props;
    const reviews = headlines && headlines[index] ? headlines[index].reviews : [];

    return (
      <tr key={headline}>
        <td style={{ width: '90%' }}>
          <Field
            type="text" component={FormControl}
            id={`${headline}.text`}
            name={`${headline}.text`}
            group={`${form}.headlines`}
            index={index}
            label="Headline"
            readOnly={!!(headlines[index] && headlines[index]._id)}
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
                name={`${headline}.reviews`}
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
                name={`${headline}.reviews`}
                component={ReviewFieldArray}
                isUpdate={isUpdate}
              />
            </table>
          }
        </td>
        <td className="text-center">
          {isUpdate && !(headlines[index] && headlines[index]._id) &&
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
    const { fields, headlines, isUpdate } = this.props;
    return (
      <tbody>
        {headlines && fields.map((headline, index) => this.renderHeadline(fields, headline, index))}
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

HeadlineField.propTypes = {
  form: PropTypes.string.isRequired,
  headlines: PropTypes.array,
  fields: PropTypes.object.isRequired,
  department: PropTypes.string.isRequired,
  isUpdate: PropTypes.bool,
  onFieldArrayRemove: PropTypes.func.isRequired,
};

export default HeadlineField;
