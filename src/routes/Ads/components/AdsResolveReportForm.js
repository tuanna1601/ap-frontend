import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import { AdsField } from '@/components/Field';
import { FormControlTextArea, FormControl } from '@/components/FormControl';

const AdsResolveReportForm = ({ handleSubmit, submitting, pristine,
  reset, form, initialValues, getAdsPreview, preview, onSubmit }) => (
    <div className="modal-form">
      <form>
        <div className="row">
          <div className="col-md-6">
            <Field
              type="text" component={FormControl}
              id="title" name="title"
              label="Title"
              hasLabel readOnly
            />
            <Field
              type="text" component={FormControl}
              id="creator.email" name="creator.email"
              label="Người tạo"
              hasLabel readOnly
            />
            <Field
              type="text" component={FormControl}
              id="reason" name="reason"
              label="Lý do vi phạm"
              hasLabel readOnly
            />
          </div>
          <div className="col-md-6">
            <AdsField
              id="ad" name="ad"
              label="Ad vi phạm"
              hasLabel
              onSelect={(value) => getAdsPreview(value)}
            />
            <Field
              type="text" component={FormControlTextArea}
              id="note" name="note"
              label="Chi tiết lỗi bị gắn cờ"
              hasLabel
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h4>Ảnh vi phạm</h4>
            <div>
              <img
                src={`${__CONFIG__.API.SERVER_URL}/${initialValues.image}`}
                alt={initialValues.title} style={{ width: '100%' }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <h4>Ads Preview</h4>
            <div className="iframe">
              {preview}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button
              className="btn btn-success btn-flat"
              disabled={submitting}
              type="submit"
              onClick={handleSubmit(values => onSubmit(values, true))}
            >
              Gắn cờ
            </button>
            <button
              className="btn btn-warning btn-flat"
              disabled={submitting}
              type="submit"
              onClick={handleSubmit(values => onSubmit(values, false))}
            >
              Từ chối
            </button>
            <button
              className="btn btn-default btn-flat" type="button"
              disabled={pristine || submitting} onClick={reset}
            >
              <i className="fa fa-undo" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );

AdsResolveReportForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  preview: PropTypes.any,

  getAdsPreview: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default reduxForm()(AdsResolveReportForm);
