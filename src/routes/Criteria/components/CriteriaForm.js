import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';

import { FormControl } from '@/components/FormControl';
import { DepartmentField } from '@/components/Field';

class CriteriaForm extends Component {
  constructor(props) {
    super(props);

    this.renderCriteria = this.renderCriteria.bind(this);
    this.renderCriterias = this.renderCriterias.bind(this);
  }

  renderCriteria(fields, criteria, index) {
    return (
      <tr key={criteria}>
        <td>
          <Field
            type="text" component={FormControl}
            id={`${criteria}`} name={`${criteria}`}
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

  renderCriterias(criterias) {
    const fields = criterias.fields;

    return (
      <tbody>
        {fields.map((criteria, index) => this.renderCriteria(fields, criteria, index))}
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
    const { handleSubmit, submitting, pristine, reset, form } = this.props;
    return (
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <DepartmentField
              id={`${form}.department`} name="department"
              label="Đơn vị"
              hasLabel hasRoot
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-condensed table-striped table-bordered table-field-array">
            <thead>
              <tr>
                <th style={{ width: '90%' }}>Tiêu chí</th>
                <th style={{ width: '10%' }}>&nbsp;</th>
              </tr>
            </thead>
            <FieldArray name="name" component={this.renderCriterias} />
          </table>
        </div>
        <div className="button-list">
          <button className="btn btn-success btn-flat" type="submit" disabled={submitting}>
            <i className="fa fa-save" />
          </button>
          <button
            className="btn btn-default btn-flat" type="button"
            disabled={pristine || submitting} onClick={reset}
          >
            <i className="fa fa-undo" />
          </button>
        </div>
      </form>
    );
  }
}

CriteriaForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired,

  onFieldArrayRemoved: PropTypes.func.isRequired
};

export default reduxForm()(CriteriaForm);
