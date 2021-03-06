import React, { PropTypes } from 'react';
import { Field, FieldArray } from 'redux-form';

import { FormControl, FormControlSelect } from '@/components/FormControl';
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
    const { department, form, criteria,
      medias, isUpdate, onFieldArrayRemove, isOldMedia } = this.props;
    const reviews = medias && medias[index] ? medias[index].reviews : [];
    if (!isOldMedia) {
      return (
        <tr key={media}>
          <td style={{ width: '45%' }}>
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
          <td style={{ width: '45%' }}>
            {medias[index] &&
              medias[index].type === 'video' &&
              <div>
                <Field
                  type="text" component={FormControl}
                  id={`${media}.thumbnail`} name={`${media}.thumbnail`}
                  group={`${this.props.form}.media`}
                  index={index}
                  label="Thumbnail" hasLabel
                />
                <Field
                  type="text" component={FormControl}
                  id={`${media}.value`} name={`${media}.value`}
                  group={`${this.props.form}.media`}
                  index={index}
                  label="Link URL" hasLabel
                />
              </div>
            }
            {medias[index] &&
              medias[index].type === 'image' &&
              <Field
                type="text" component={FormControl}
                id={`${media}.value`} name={`${media}.value`}
                group={`${this.props.form}.media`}
                index={index}
                label="Link URL" hasLabel
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
            {medias[index].type === 'video' &&
              <div className="col-xs-12">
                <p>Đường link Video</p>
                <a href={medias[index].path}>{medias[index].path}</a>
              </div>
            }
            <div className="col-md-6">
              {medias[index].type === 'image' &&
                <img
                  src={medias[index].path}
                  alt={medias[index].path}
                  style={{ width: '100%' }}
                  className="img-thumbnail"
                />
              }
              {medias[index].type === 'video' &&
                <div>
                  <video
                    style={{ width: '100%' }}
                    controls poster={medias[index].thumbnail}
                  >
                    <source src={medias[index].path} />
                  </video>
                </div>
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
                criteria={criteria}
                component={ReviewFieldArray}
                name={`${media}.reviews`}
                form={form} reviewed={medias[index].reviewed}
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
                criteria={criteria}
                name={`${media}.reviews`}
                component={ReviewFieldArray}
                isUpdate={isUpdate}
                form={form}
              />
            </table>
          }
        </td>
        <td style={{ width: '10%' }} className="text-center">
          &nbsp;
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
  criteria: PropTypes.array,
  fields: PropTypes.object.isRequired,
  department: PropTypes.string,
  isUpdate: PropTypes.bool,
  isOldMedia: PropTypes.bool,
  onFieldArrayRemove: PropTypes.func.isRequired,
};

export default MediaField;
