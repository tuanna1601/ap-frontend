import React, { Component, PropTypes } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import {
  FormControl, FormControlTextArea,
  FormControlSelect, FormControlUpload
} from '@/components/FormControl';
import { DepartmentField } from '@/components/Field';
import Validator from '@/helpers/validator';
import { Tab, Tabs } from '@/components/Tabs';

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

class InventoryForm extends Component {
  constructor(props) {
    super(props);

    this.renderHeadlines = this.renderHeadlines.bind(this);
    this.renderHeadline = this.renderHeadline.bind(this);
    this.renderMediaArr = this.renderMediaArr.bind(this);
    this.renderMedia = this.renderMedia.bind(this);
    this.renderDescriptions = this.renderDescriptions.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
  }

  renderHeadline = (fields, headline, index) => {
    if (!this.props.headlines) {
      return (
        <tr key={index}>
          <td colSpan={2}>&nbsp;</td>
        </tr>
      );
    }
    return (
      <tr key={index}>
        <td>
          <Field
            type="text" component={FormControl}
            id={`${headline}.value`}
            name={`${headline}.value`}
            group={`${this.props.form}.headlines`}
            index={index}
            label="Headline"
          />
        </td>
        <td>
          <button
            className="btn btn-xs btn-flat btn-danger" type="button"
            onClick={() => this.props.onFieldArrayRemoved(fields, index)}
          >
            <i className="fa fa-trash" />
          </button>
        </td>
      </tr>
    );
  }

  renderHeadlines = (headlines) => {
    const fields = headlines.fields;

    return (
      <tbody>
        <tr>
          <td colSpan={2}>
            <h4 className="page-header no-margin">
              Thêm Headline
            </h4>
          </td>
        </tr>
        {fields.map((headline, index) => this.renderHeadline(fields, headline, index))}
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
      </tbody>
    );
  }

  renderMedia = (fields, media, index) => {
    if (!this.props.media) {
      return (
        <tr key={index}>
          <td colSpan={2}>&nbsp;</td>
        </tr>
      );
    }
    return (
      <tr key={index}>
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
          {this.props.media[index] &&
            this.props.media[index].type === 'video' &&
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
                type="text" component={FormControl}
                id={`${media}.value`} name={`${media}.value`}
                group={`${this.props.form}.media`}
                index={index}
                label="Link URL" hasLabel
              />
            </div>
          }
          {this.props.media[index] &&
            this.props.media[index].type === 'image' &&
            <Field
              type="text" component={FormControl}
              id={`${media}.value`} name={`${media}.value`}
              group={`${this.props.form}.media`}
              index={index}
              label="Link URL" hasLabel
            />
          }
        </td>
        <td>
          <button
            className="btn btn-xs btn-flat btn-danger" type="button"
            onClick={() => this.props.onFieldArrayRemoved(fields, index)}
          >
            <i className="fa fa-trash" />
          </button>
        </td>
      </tr>
    );
  }

  renderMediaArr = (mediaArr) => {
    const fields = mediaArr.fields;
    console.log(mediaArr);

    return (
      <tbody>
        <tr>
          <td colSpan={3}>
            <h4 className="page-header no-margin">
              Thêm Media
            </h4>
          </td>
        </tr>
        {fields.map((media, index) => this.renderMedia(fields, media, index))}
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
      </tbody>
    );
  }

  renderDescription = (fields, description, index) => {
    if (!this.props.descriptions) {
      return (
        <tr key={index}>
          <td colSpan={2}>&nbsp;</td>
        </tr>
      );
    }
    return (
      <tr key={index}>
        <td>
          <Field
            type="text" component={FormControl}
            id={`${description}.value`}
            name={`${description}.value`}
            group={`${this.props.form}.descriptions`}
            index={index}
            label="Description"
          />
        </td>
        <td>
          <button
            className="btn btn-xs btn-flat btn-danger" type="button"
            onClick={() => this.props.onFieldArrayRemoved(fields, index)}
          >
            <i className="fa fa-trash" />
          </button>
        </td>
      </tr>
    );
  }

  renderDescriptions = (descriptions) => {
    const fields = descriptions.fields;

    return (
      <tbody>
        <tr>
          <td colSpan={2}>
            <h4 className="page-header no-margin">
              Thêm Description
            </h4>
          </td>
        </tr>
        {fields.map((description, index) => this.renderDescription(fields, description, index))}
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
      </tbody>
    );
  }

  render() {
    const { handleSubmit, isLoading, submitting, pristine, reset } = this.props;

    return (
      <div className="box box-warning">
        <div className="box-header with-border">
          <h3 className="box-title">Danh sách kho</h3>
          <div className="box-tools pull-right">
            {this.props.isLoading && <i className="fa fa-refresh fa-spin" />}
          </div>
        </div>
        <div className="box-body">
          <form className="table-row" onSubmit={handleSubmit}>
            <Tabs>
              <Tab title="Kho nguyên liệu quảng cáo">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <DepartmentField
                        id="department" name="department"
                        label="Đơn vị" hasLabel
                        params={{ isHidden: false }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <Field
                        type="text" component={FormControl}
                        id="name" name="name"
                        label="Tên kho" hasLabel
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <div className="form-group">
                      <Field
                        type="text" component={FormControlTextArea}
                        id="text" name="text"
                        label="Text" hasLabel
                        rows={20}
                      />
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab title="Headline">
                <div className="table-repsonsive">
                  <table className="table table-condensed table-striped table-bordered table-field-array">
                    <thead>
                      <tr>
                        <th style={{ width: '90%' }}>
                          Headline
                        </th>
                        <th style={{ width: '10%' }}>
                          &nbsp;
                        </th>
                      </tr>
                    </thead>
                    <FieldArray name="headlines" component={this.renderHeadlines} />
                  </table>
                </div>
              </Tab>
              <Tab title="Media">
                <div className="table-repsonsive">
                  <table className="table table-condensed table-striped table-bordered table-field-array">
                    <thead>
                      <tr>
                        <th colSpan={2} style={{ width: '90%' }}>
                          Media
                        </th>
                        <th style={{ width: '10%' }}>
                          &nbsp;
                        </th>
                      </tr>
                    </thead>
                    <FieldArray name="medias" component={this.renderMediaArr} />
                  </table>
                </div>
              </Tab>
              <Tab title="Description">
                <div className="table-repsonsive">
                  <table className="table table-condensed table-striped table-bordered table-field-array">
                    <thead>
                      <tr>
                        <th style={{ width: '90%' }}>
                          Description
                        </th>
                        <th style={{ width: '10%' }}>
                          &nbsp;
                        </th>
                      </tr>
                    </thead>
                    <FieldArray name="descriptions" component={this.renderDescriptions} />
                  </table>
                </div>
              </Tab>
            </Tabs>
            <div className="col-xs-12">
              <button className="btn btn-success btn-flat" type="submit" disabled={submitting || isLoading}>
                {isLoading ? <i className="fa fa-refresh fa-spin" /> : <i className="fa fa-save" />}
              </button>
              <button
                className="btn btn-default btn-flat" type="button"
                disabled={pristine || submitting || isLoading} onClick={reset}
              >
                <i className="fa fa-undo" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

InventoryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,

  form: PropTypes.string.isRequired,
  headlines: PropTypes.array,
  descriptions: PropTypes.array,
  media: PropTypes.array,

  onFieldArrayRemoved: PropTypes.func.isRequired,
};

function validateHeadlines(headlines) {
  if (headlines && headlines.length) {
    return headlines.map((headline) => ({
      value: (new Validator(headline ? headline.value : ''))
        .validateRequired()
        .getMessage()
    }));
  }

  return 'Cần ít nhất 1 phần tử';
}

function validateMedia(mediaArr) {
  if (mediaArr && mediaArr.length) {
    return mediaArr.map((media) => {
      if (media && media.value) {
        return {
          value: (new Validator(media.value ? media.value : ''))
            .validateRequired()
            .validateURL('files.topica.edu.vn')
            .getMessage(),
          thumbnail: (new Validator(media.thumbnail))
            .validateRequired()
            .getMessage(),
        };
      }
      return 'Chưa chọn file';
    });
  }

  console.log(mediaArr);

  return 'Cần ít nhất 1 phần từ';
}

function validateDescriptions(descriptions) {
  if (descriptions && descriptions.length) {
    return descriptions.map((description) => ({
      value: (new Validator(description ? description.value : ''))
        .validateRequired()
        .getMessage()
    }));
  }

  return 'Cần ít nhất 1 phần tử';
}

export default reduxForm({
  validate: (values) => ({
    name: (new Validator(values.name))
      .validateRequired()
      .getMessage(),
    text: (new Validator(values.text))
      .validateRequired()
      .getMessage(),
    headlines: validateHeadlines(values.headlines),
    descriptions: validateDescriptions(values.descriptions),
    medias: validateMedia(values.medias)
  }),
})(InventoryForm);
