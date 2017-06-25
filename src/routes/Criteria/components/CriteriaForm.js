import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';

import { FormControl } from '@/components/FormControl';
import { DepartmentField } from '@/components/Field';

class CriteriaForm extends Component {
  constructor(props) {
    super(props);

    this.renderCriterion = this.renderCriterion.bind(this);
    this.renderCriteria = this.renderCriteria.bind(this);
  }

  renderCriterion(fields, criterion, index) {
    return (
      <tr key={criterion}>
        <td>
          <Field
            type="text" component={FormControl}
            id={`${criterion}`} name={`${criterion}`}
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

  renderCriteria(criteria) {
    const fields = criteria.fields;

    return (
      <tbody>
        {fields.map((criterion, index) => this.renderCriterion(fields, criterion, index))}
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
            <FieldArray name="name" component={this.renderCriteria} />
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
