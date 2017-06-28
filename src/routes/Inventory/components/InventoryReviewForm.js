import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';

import * as _ from 'lodash';
import diff from '@/helpers/diff';
import { FormControlSelect } from '@/components/FormControl';
import { generateInventoryStatusOptions } from '@/helpers/helper';

import TextField from './InventoryFields/TextField';
import HeadlineField from './InventoryFields/HeadlineField';
import DescriptionField from './InventoryFields/DescriptionField';
import MediaField from './InventoryFields/MediaField';

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

  render() {
    const { handleSubmit, isLoadingCreate, isLoadingList, submitting,
      pristine, reset, criteria, initialValues, form, department } = this.props;

    return (
      <div className="row">
        <div className="col-md-8">
          <div className="box box-success">
            <div className="box-header with-border">
              <h3 className="box-title">Duyệt kho</h3>
              <div className="box-tools pull-right">
                {isLoadingCreate && <i className="fa fa-refresh fa-spin" />}
              </div>
            </div>
            {!isLoadingList &&
              <div className="box-body">
                <form className="table-row" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <b>Tên kho:</b> {initialValues.name}
                    </div>
                    <div className="col-md-6">
                      <Field
                        component={FormControlSelect}
                        options={generateInventoryStatusOptions()}
                        id="status" name="status"
                        label="Trạng thái"
                      />
                    </div>
                  </div>
                  <table className="table table-field-array">
                    <thead>
                      <tr>
                        <th>
                          <h3 className="no-margin">Text</h3>
                        </th>
                      </tr>
                    </thead>
                    <TextField department={department} form={form} />
                  </table>
                  <table className="table table-condensed table-bordered table-field-array">
                    <FieldArray name="headlines" form={form} department={department} component={HeadlineField} />
                  </table>
                  <table className="table table-condensed table-bordered table-field-array">
                    <FieldArray name="descriptions" form={form} department={department} component={DescriptionField} />
                  </table>
                  <table className="table table-condensed table-bordered table-field-array">
                    <FieldArray
                      form={form}
                      name="medias"
                      component={MediaField}
                      department={department}
                      medias={initialValues.medias}
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
          <div style={{ position: 'fixed' }} className="box">
            <div className="box-header with-border">
              Bộ tiêu chí
            </div>
            <div className="box-body">
              {criteria &&
                <ul>
                  {_.map(criteria, (criterion) => (
                    <li key={criterion.id}>{criterion.name}</li>
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
  initialValues: PropTypes.object.isRequired,
  criteria: PropTypes.object.isRequired,

  onComponentMounted: PropTypes.func.isRequired,
  navigateToList: PropTypes.func.isRequired,
};

export default reduxForm()(InventoryReviewForm);
