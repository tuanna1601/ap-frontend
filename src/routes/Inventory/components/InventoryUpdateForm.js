import React, { Component, PropTypes } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { FormControl, FormControlSelect } from '@/components/FormControl';
import { DepartmentField } from '@/components/Field';
import Validator from '@/helpers/validator';

import {
  generateInventoryStatusOptions,
} from '@/helpers/helper';

import navConfirm from '@/components/HighOrder/navConfirm';

import TextField from './InventoryFields/TextField';
import HeadlineField from './InventoryFields/HeadlineFieldContainer';
import DescriptionField from './InventoryFields/DescriptionFieldContainer';
import MediaField from './InventoryFields/MediaFieldContainer';

class InventoryUpdateForm extends Component {
  componentWillMount() {
    if (!this.props.id) {
      this.props.navigateToList();
    }
  }

  componentDidMount() {
    if (this.props.id) {
      this.props.onComponentMounted(this.props.id);
    }
  }

  render() {
    const { handleSubmit, isLoadingCreate, isLoadingList,
      newMedias, headlines, descriptions, criteria,
      submitting, pristine, reset, form, department, initialValues } = this.props;

    return (
      <div className="box box-warning">
        <div className="box-header with-border">
          <h3 className="box-title">Sửa kho</h3>
          <div className="box-tools pull-right">
            {isLoadingCreate && <i className="fa fa-refresh fa-spin" />}
          </div>
        </div>
        {!isLoadingList && initialValues &&
          <div className="box-body">
            <form className="table-row" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <Field
                    type="text" component={FormControl}
                    id="name" name="name"
                    label="Tên kho" hasLabel
                    readOnly
                  />
                  <DepartmentField
                    id="department" name="department"
                    label="Đơn vị" hasLabel
                    disabled
                  />
                  <Field
                    component={FormControlSelect}
                    options={generateInventoryStatusOptions()}
                    id="status" name="status"
                    label="Trạng thái" hasLabel
                    disabled
                  />
                </div>
              </div>
              <h3>Text</h3>
              <table className="table table-field-array">
                <TextField
                  form={form}
                  department={department}
                  criteria={criteria}
                  isUpdate
                />
              </table>
              <h3>Headlines</h3>
              <table className="table table-condensed table-bordered table-field-array">
                <FieldArray
                  form={form}
                  name="headlines"
                  headlines={headlines}
                  department={department}
                  criteria={criteria}
                  component={HeadlineField}
                  isUpdate
                />
              </table>
              <h3>Descriptions</h3>
              <table className="table table-condensed table-bordered table-field-array">
                <FieldArray
                  form={form}
                  name="descriptions"
                  descriptions={descriptions}
                  department={department}
                  criteria={criteria}
                  component={DescriptionField}
                  isUpdate
                />
              </table>
              <h3>Media</h3>
              <table className="table table-condensed table-bordered table-field-array">
                <FieldArray
                  form={form}
                  name="medias"
                  component={MediaField}
                  department={department}
                  criteria={criteria}
                  medias={initialValues.medias}
                  isOldMedia
                  isUpdate
                />
                <FieldArray
                  form={form}
                  name="newMedias"
                  medias={newMedias}
                  component={MediaField}
                  isUpdate
                />
              </table>
              <div className="col-xs-12">
                <button className="btn btn-success btn-flat" type="submit" disabled={submitting || isLoadingCreate}>
                  {isLoadingCreate ? <i className="fa fa-refresh fa-spin" /> : <i className="fa fa-save" />}
                </button>
                <button
                  className="btn btn-default btn-flat" type="button"
                  disabled={pristine || submitting || isLoadingCreate} onClick={reset}
                >
                  <i className="fa fa-undo" />
                </button>
              </div>
            </form>
          </div>
        }
      </div>
    );
  }
}

InventoryUpdateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  isLoadingCreate: PropTypes.bool.isRequired,
  isLoadingList: PropTypes.bool.isRequired,

  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,

  department: PropTypes.string,
  initialValues: PropTypes.object,
  id: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  newMedias: PropTypes.array,
  headlines: PropTypes.array,
  descriptions: PropTypes.array,
  text: PropTypes.object,
  criteria: PropTypes.array,

  onFieldArrayRemoved: PropTypes.func.isRequired,
  onComponentMounted: PropTypes.func.isRequired,
  navigateToList: PropTypes.func.isRequired,
};

function validateHeadlines(headlines) {
  if (headlines && headlines.length) {
    return headlines.map((headline) => ({
      value: (new Validator(headline ? headline.value : ''))
        .validateRequired()
        .getMessage()
    }));
  }

  return false;
}

function validateMedia(mediaArr) {
  if (mediaArr && mediaArr.length) {
    return mediaArr.map((media) => {
      if (media && media.value) {
        return {
          value: (new Validator(media.value))
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

  return false;
}

function validateDescriptions(descriptions) {
  if (descriptions && descriptions.length) {
    return descriptions.map((description) => ({
      value: (new Validator(description ? description.value : ''))
        .validateRequired()
        .getMessage()
    }));
  }

  return false;
}

export default reduxForm({
  validate: (values) => ({
    name: (new Validator(values ? values.name : ''))
      .validateRequired()
      .getMessage(),
    headlines: validateHeadlines(values ? values.headlines : null),
    descriptions: validateDescriptions(values ? values.descriptions : null),
    newMedias: validateMedia(values ? values.newMedias : null)
  }),
})(navConfirm(InventoryUpdateForm));
