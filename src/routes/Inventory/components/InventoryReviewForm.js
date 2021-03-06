import React, { Component, PropTypes } from 'react';
import { reduxForm, FieldArray } from 'redux-form';

import * as _ from 'lodash';
import { generateInventoryStatusLabel } from '@/helpers/helper';
import navConfirm from '@/components/HighOrder/navConfirm';

import TextField from './InventoryFields/TextField';
import HeadlineField from './InventoryFields/HeadlineFieldContainer';
import DescriptionField from './InventoryFields/DescriptionFieldContainer';
import MediaField from './InventoryFields/MediaFieldContainer';

class InventoryReviewForm extends Component {

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

  componentWillUnmount() {
    this.props.resetInventories();
  }

  getCurrentStep(inventory) {
    const { currentStep } = inventory;
    const step = _.find(inventory.steps, st => st.order === currentStep);
    return step;
  }

  render() {
    const { handleSubmit, isLoadingCreate, isLoadingList, submitting,
      pristine, reset, criteria, initialValues, form, department } = this.props;

    return (
      <div className="row">
        <div className="col-md-8">
          <div className="box box-warning">
            <div className="box-header with-border">
              <h3 className="box-title">Duyệt kho</h3>
              <div className="box-tools pull-right">
                {isLoadingCreate && <i className="fa fa-refresh fa-spin" />}
              </div>
            </div>
            {!isLoadingList && initialValues &&
              <div className="box-body">
                <form className="table-row" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <p><b>Tên kho:</b> {initialValues.name}</p>
                      <p><b>Đơn vị:</b> {initialValues.department.name}</p>
                      <p><b>Bước duyệt:</b> {initialValues.currentStep + 1}</p>
                      <p><b>Trạng thái bước duyệt:</b>
                        {generateInventoryStatusLabel(this.getCurrentStep(initialValues).status)}</p>
                    </div>
                  </div>
                  <h3>Text</h3>
                  <table className="table table-field-array">
                    <TextField
                      department={department}
                      form={form}
                      text={initialValues.text}
                      criteria={criteria}
                    />
                  </table>
                  <h3>Headline</h3>
                  <table className="table table-condensed table-bordered table-field-array">
                    <FieldArray
                      name="headlines"
                      form={form}
                      component={HeadlineField}
                      department={department}
                      criteria={criteria}
                      headlines={initialValues.headlines}
                    />
                  </table>
                  <h3>Description</h3>
                  <table className="table table-condensed table-bordered table-field-array">
                    <FieldArray
                      name="descriptions"
                      form={form}
                      component={DescriptionField}
                      department={department}
                      criteria={criteria}
                      descriptions={initialValues.descriptions}
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
        </div>
        <div className="col-md-4">
          <div className="box">
            <div className="box-header with-border">
              Bộ tiêu chí
            </div>
            <div className="box-body">
              {criteria &&
                <ul>
                  {_.map(criteria, (criterion, index) => (
                    <li key={index}>{criterion.name}</li>
                  ))}
                </ul>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InventoryReviewForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  isLoadingCreate: PropTypes.bool.isRequired,
  isLoadingList: PropTypes.bool.isRequired,

  id: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  initialValues: PropTypes.object,
  criteria: PropTypes.array.isRequired,

  onComponentMounted: PropTypes.func.isRequired,
  navigateToList: PropTypes.func.isRequired,
  resetInventories: PropTypes.func.isRequired,
};

export default reduxForm()(navConfirm(InventoryReviewForm));
