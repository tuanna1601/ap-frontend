import React from 'react';
import { Field, reduxForm } from 'redux-form';

import Validator from '@/helpers/validator';
import { FormControlUpload } from '@/components/FormControl';

class UserImportForm extends React.Component {
  componentDidMount() {

  }

  render() {
    const { handleSubmit, isLoading, submitting, pristine, reset } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Field
            type="file" component={FormControlUpload}
            id="importFile"
            name="importFile"
            label="Import danh sách nhân viên"
          />
        </div>
        <div className="button-list">
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
    );
  }
}

UserImportForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  reset: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
};

export default reduxForm({
  validate: (values) => ({
    importFile: (new Validator(values.importFile))
      .validateFile('xlsx')
      .getMessage()
  })
})(UserImportForm);
