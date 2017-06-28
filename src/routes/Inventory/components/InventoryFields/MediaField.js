import React, { PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';

import { FormControl } from '@/components/FormControl';
import ReviewFieldArray from './ReviewFieldArrayContainer';

const HeadlineField = ({ fields, department, form, medias }) => (
  <tbody>
    <tr>
      <td>
        <h4 className="no-margin">Media</h4>
      </td>
    </tr>
    {fields.map((media, index) => (
      <tr key={media}>
        <td>
          <div className="row">
            <div className="col-md-6">
              <img
                src={`${__CONFIG__.API.SERVER_URL}/${medias[index].path}`}
                alt={medias[index].path}
                style={{ width: '100%' }}
                className="img-thumbnail"
              />
              <Field
                type="hidden" component={FormControl}
                id={`${media}.path`}
                name={`${media}.path`}
                group={`${form}.medias`}
                index={index}
                label="Media"
                readOnly
              />
            </div>
          </div>
          <table className="table table-condensed table-striped table-bordered table-field-array">
            <thead>
              <tr>
                <th style={{ width: '45%' }}>Comment</th>
                <th style={{ width: '45%' }}>Criteria</th>
                <th style={{ width: '10%' }}>&nbsp;</th>
              </tr>
            </thead>
            <FieldArray name={`${media}.reviews`} department={department} component={ReviewFieldArray} />
          </table>
        </td>
      </tr>
    ))}
  </tbody>
);

HeadlineField.propTypes = {
  form: PropTypes.string.isRequired,
  medias: PropTypes.array.isRequired,
  fields: PropTypes.object.isRequired,
  department: PropTypes.string.isRequired,
};

export default HeadlineField;
