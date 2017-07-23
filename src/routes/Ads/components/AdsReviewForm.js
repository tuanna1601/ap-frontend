import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import moment from 'moment';

import * as _ from 'lodash';
import { FormControlTextArea, FormControlSelect } from '@/components/FormControl';
import { generateAdsStatusOptions } from '@/helpers/helper';

class AdsReviewForm extends Component {

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
    this.props.onComponentUnmount();
  }

  render() {
    const { handleSubmit, isLoadingCreate, isLoadingList, submitting,
      pristine, reset, criteria, initialValues, form, preview } = this.props;
    return (
      <div className="box box-success">
        <div className="box-header with-border">
          <h3 className="box-title">Hậu kiểm Ad</h3>
          <div className="box-tools pull-right">
            {isLoadingCreate && <i className="fa fa-refresh fa-spin" />}
          </div>
        </div>
        {!isLoadingList && initialValues.inventory &&
          <div className="box-body">
            <form className="table-row" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td className="table-col">
                          <b>Tên kho:</b>
                        </td>
                        <td className="table-col">
                          {initialValues.inventory.name}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-col">
                          <b>Người tạo:</b>
                        </td>
                        <td className="table-col">
                          {initialValues.creator.email}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-col">
                          <b>Tên ad:</b>
                        </td>
                        <td className="table-col">
                          {initialValues.name}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td className="table-col">
                          <b>Ngày publish:</b>
                        </td>
                        <td className="table-col">
                          {moment(initialValues.created).format('HH:mm DD-MM-YYYY')}
                        </td>
                      </tr>
                      <tr>
                        <td className="table-col">
                          <b>Trạng thái hậu kiểm</b>
                        </td>
                        <td className="table-col">
                          <Field
                            id="status" name="status"
                            component={FormControlSelect}
                            options={generateAdsStatusOptions()}
                            label="Trạng thái"
                            disabled={initialValues.status === 'removed'}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <Field
                    type="text" component={FormControlTextArea}
                    id="noteFlag" name="noteFlag"
                    label="Chi tiết lỗi bị gắn cờ"
                    hasLabel readOnly
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <h4>Ads preview</h4>
                  <div className="iframe">
                    {preview}
                  </div>
                </div>
                <div className="col-md-6">
                  {criteria &&
                    <ul>
                      {_.map(criteria, (criterion) => (
                        <li key={criterion.id}>{criterion.name}</li>
                      ))}
                    </ul>}
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <Field
                    type="text" component={FormControlTextArea}
                    id="noteReview" name="noteReview"
                    label="Chi tiết lỗi sau hậu kiểm"
                    hasLabel
                    readOnly={initialValues.status === 'removed'}
                  />
                </div>
              </div>
              <div className="row">
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
              </div>
            </form>
          </div>
        }
      </div>
    );
  }
}

AdsReviewForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  isLoadingCreate: PropTypes.bool.isRequired,
  isLoadingList: PropTypes.bool.isRequired,

  id: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  preview: PropTypes.any,
  department: PropTypes.string,
  initialValues: PropTypes.object.isRequired,
  criteria: PropTypes.object,

  onComponentMounted: PropTypes.func.isRequired,
  onComponentUnmount: PropTypes.func.isRequired,
  navigateToList: PropTypes.func.isRequired,
};

export default reduxForm()(AdsReviewForm);
