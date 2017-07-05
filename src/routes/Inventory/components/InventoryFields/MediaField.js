import React, { PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';

import { FormControl, FormControlSelect, FormControlUpload } from '@/components/FormControl';
import ReviewFieldArray from './ReviewFieldArrayContainer';

const mediaTypeOptions = [
  {
    value: 'image',
    label: 'Ảnh'
  },
  {
    value: 'video',
    label: 'Video'
  }
];


class MediaField extends React.Component {
  constructor(props) {
    super(props);

    this.renderMedia = this.renderMedia.bind(this);
  }

  renderMedia(fields, media, index) {
    const { department, form, medias, isUpdate, onFieldArrayRemove, isOldMedia } = this.props;
    const reviews = medias && medias[index] ? medias[index].reviews : [];
    if (!isOldMedia) {
      return (
        <tr key={media}>
          <td style={{ width: '30%' }}>
            <Field
              component={FormControlSelect}
              options={mediaTypeOptions}
              id={`${media}.type`} name={`${media}.type`}
              group={`${this.props.form}.media`}
              index={index}
              label="Loại Media" hasLabel
              autoSelect={false}
            />
          </td>
          <td style={{ width: '60%' }}>
            {medias[index] &&
              medias[index].type === 'video' &&
              <div>
                <Field
                  component={FormControlUpload}
                  id={`${media}.thumbnail`}
                  name={`${media}.thumbnail`}
                  group={`${this.props.form}.media`}
                  index={index}
                  label="Thumbnail" hasLabel
                />
                <Field
                  component={FormControlUpload}
                  id={`${media}.value`}
                  name={`${media}.value`}
                  group={`${this.props.form}.media`}
                  index={index}
                  label="Video" hasLabel
                />
              </div>
            }
            {medias[index] &&
              medias[index].type === 'image' &&
              <Field
                component={FormControlUpload}
                id={`${media}.value`}
                name={`${media}.value`}
                group={`${this.props.form}.media`}
                index={index}
                label="Ảnh" hasLabel
              />
            }
          </td>
          <td className="text-center">
            <button
              className="btn btn-xs btn-flat btn-danger" type="button"
              onClick={() => onFieldArrayRemove(fields, index)}
            >
              <i className="fa fa-trash" />
            </button>
          </td>
        </tr>
      );
    }

    return (
      <tr key={media}>
        <td colSpan={2}>
          <div className="row">
            <div className="col-md-6">
              {medias[index].type === 'image' &&
                <img
                  src={`${__CONFIG__.API.SERVER_URL}/${medias[index].path}`}
                  alt={medias[index].path}
                  style={{ width: '100%' }}
                  className="img-thumbnail"
                />
              }
              {medias[index].type === 'video' &&
                <video
                  style={{ width: '100%' }}
                  controls poster={`${__CONFIG__.API.SERVER_URL}/${medias[index].thumbnail}`}
                >
                  <source src={`${__CONFIG__.API.SERVER_URL}/${medias[index].path}`} />
                </video>
              }
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
                name={`${media}.reviews`}
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
                name={`${media}.reviews`}
                component={ReviewFieldArray}
                isUpdate={isUpdate}
              />
            </table>
          }
        </td>
        <td className="text-center">
          {isUpdate &&
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
    const { fields, medias, isUpdate, isOldMedia } = this.props;
    return (
      <tbody>
        {medias && fields.map((media, index) => this.renderMedia(fields, media, index))}
        {isUpdate && !isOldMedia &&
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
  }
}

MediaField.defaultProps = {
  isUpdate: false,
  isOldMedia: false
};

MediaField.propTypes = {
  form: PropTypes.string.isRequired,
  medias: PropTypes.array,
  fields: PropTypes.object.isRequired,
  department: PropTypes.string.isRequired,
  isUpdate: PropTypes.bool,
  isOldMedia: PropTypes.bool,
  onFieldArrayRemove: PropTypes.func.isRequired,
};

export default MediaField;
