import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import Validator from '@/helpers/validator';
import { FormControlTextArea, FormControlUpload, FormControl } from '@/components/FormControl';

const AdsReportForm = ({ handleSubmit, submitting, pristine, reset, form, isLoading }) => (
  <div className="box box-warning">
    <div className="box-header with-border">
      Báo cáo Ad vi phạm
    </div>
    <div className="box-body">
      <form className="table-row" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Field
              type="text" component={FormControl}
              id="title" name="title"
              label="Title"
              hasLabel
            />
            <Field
              component={FormControlUpload}
              id="image" name="image"
              label="Ảnh Ad vi phạm (*)"
              hasLabel
            />
            <Field
              type="text" component={FormControlTextArea}
              id="reason" name="reason"
              label="Lý do vi phạm"
              hasLabel
            />
          </div>
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
        </div>
      </form>
    </div>
  </div>
);

AdsReportForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default reduxForm({
  validate: (values) => ({
    title: (new Validator(values.title))
      .validateRequired()
      .getMessage(),
    image: (new Validator(values.image))
      .validateFile(['jpg', 'jpeg', 'png', 'gif'])
      .getMessage()
  })
})(AdsReportForm);
