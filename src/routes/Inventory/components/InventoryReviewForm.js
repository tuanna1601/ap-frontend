import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';

import * as _ from 'lodash';
import diff from '@/helpers/diff';
import { FormControl, FormControlSelect } from '@/components/FormControl';
import { CriteriaField } from '@/components/Field';
import { generateInventoryStatusOptions } from '@/helpers/helper';

class InventoryReviewForm extends Component {

  constructor(props) {
    super(props);

    this.renderReview = this.renderReview.bind(this);
    this.renderReviews = this.renderReviews.bind(this);
    this.renderText = this.renderText.bind(this);
    this.renderMedia = this.renderMedia.bind(this);
    this.renderMedias = this.renderMedias.bind(this);
    this.renderHeadline = this.renderHeadline.bind(this);
    this.renderHeadlines = this.renderHeadlines.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.renderDescriptions = this.renderDescriptions.bind(this);
  }

  componentDidMount() {
    this.props.onComponentMounted(this.props.id);
  }

  renderReview(fields, review, index) {
    return (
      <tr key={review}>
        <td>
          <Field
            type="text" component={FormControl}
            id={`${review}.comment`}
            name={`${review}.comment`}
            index={index}
            label="Review"
          />
        </td>
        <td>
          <CriteriaField
            id={`${review}.criteria`}
            name={`${review}.criteria`}
            department={this.props.department}
            index={index}
            label="Tiêu chí"
            autoSelect={false}
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

  renderReviews(reviews) {
    const fields = reviews.fields;

    return (
      <tbody>
        {fields.map((review, index) => this.renderReview(fields, review, index))}
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

  renderMedia(fields, media, index) {
    const { medias } = this.props.initialValues;
    return (
      <tr key={media}>
        <td>
          <div className="row">
            <div className="col-md-6">
              <img
                src={`${__CONFIG__.API.SERVER_URL}/${medias[index].path}`}
                alt={medias[index].path}
                style={{ width: '100%' }}
                className="img-thumbnail"
              />
              <Field
                type="hidden" component={FormControl}
                id={`${media}.path`}
                name={`${media}.path`}
                group={`${this.props.form}.medias`}
                index={index}
                label="Media"
                readOnly
              />
            </div>
          </div>
          <table className="table table-condensed table-striped table-bordered table-field-array">
            <thead>
              <tr>
                <th style={{ width: '45%' }}>
                  Comment
                </th>
                <th style={{ width: '45%' }}>
                  Criteria
                </th>
                <th style={{ width: '10%' }}>
                  &nbsp;
                </th>
              </tr>
            </thead>
            <FieldArray name={`${media}.reviews`} component={this.renderReviews} />
          </table>
        </td>
      </tr>
    );
  }

  renderMedias(medias) {
    const fields = medias.fields;

    return (
      <tbody>
        <tr>
          <td>
            <h4 className="page-header no-margin">
              Medias
            </h4>
          </td>
        </tr>
        {fields.map((media, index) => this.renderMedia(fields, media, index))}
      </tbody>
    );
  }

  renderText() {
    return (
      <tbody>
        <tr>
          <td>
            <h4 className="page-header no-margin">
              Text
            </h4>
          </td>
        </tr>
        <tr>
          <td>
            <Field
              type="text" component={FormControl}
              id={'text.text'}
              name={'text.text'}
              group={`${this.props.form}.text`}
              label="Text"
              readOnly
            />
            <table className="table table-condensed table-striped table-bordered table-field-array">
              <thead>
                <tr>
                  <th style={{ width: '45%' }}>
                    Comment
                  </th>
                  <th style={{ width: '45%' }}>
                    Criteria
                  </th>
                  <th style={{ width: '10%' }}>
                    &nbsp;
                  </th>
                </tr>
              </thead>
              <FieldArray name={'text.reviews'} component={this.renderReviews} />
            </table>
          </td>
        </tr>
      </tbody>
    );
  }

  renderHeadline(fields, headline, index) {
    return (
      <tr key={headline}>
        <td>
          <Field
            type="text" component={FormControl}
            id={`${headline}.text`}
            name={`${headline}.text`}
            group={`${this.props.form}.headlines`}
            index={index}
            label="Headline"
            readOnly
          />
          <table className="table table-condensed table-striped table-bordered table-field-array">
            <thead>
              <tr>
                <th style={{ width: '45%' }}>
                  Comment
                </th>
                <th style={{ width: '45%' }}>
                  Criteria
                </th>
                <th style={{ width: '10%' }}>
                  &nbsp;
                </th>
              </tr>
            </thead>
            <FieldArray name={`${headline}.reviews`} component={this.renderReviews} />
          </table>
        </td>
      </tr>
    );
  }

  renderHeadlines(headlines) {
    const fields = headlines.fields;

    return (
      <tbody>
        <tr>
          <td>
            <h4 className="page-header no-margin">
              Headlines
            </h4>
          </td>
        </tr>
        {fields.map((headline, index) => this.renderHeadline(fields, headline, index))}
      </tbody>
    );
  }

  renderDescription(fields, description, index) {
    return (
      <tr key={description}>
        <td>
          <Field
            type="text" component={FormControl}
            id={`${description}.text`}
            name={`${description}.text`}
            group={`${this.props.form}.descriptions`}
            index={index}
            label="Description"
            readOnly
          />
          <table className="table table-condensed table-striped table-bordered table-field-array">
            <thead>
              <tr>
                <th style={{ width: '45%' }}>
                  Comment
                </th>
                <th style={{ width: '45%' }}>
                  Criteria
                </th>
                <th style={{ width: '10%' }}>
                  &nbsp;
                </th>
              </tr>
            </thead>
            <FieldArray name={`${description}.reviews`} component={this.renderReviews} />
          </table>
        </td>
      </tr>
    );
  }

  renderDescriptions(descriptions) {
    const fields = descriptions.fields;

    return (
      <tbody>
        <tr>
          <td>
            <h4 className="page-header no-margin">
              Description
            </h4>
          </td>
        </tr>
        {fields.map((description, index) => this.renderDescription(fields, description, index))}
      </tbody>
    );
  }

  render() {
    const { handleSubmit, isLoading, submitting,
      pristine, reset, criteria, initialValues } = this.props;

    return (
      <div className="row">
        <div className="col-md-8">
          <div className="box box-success">
            <div className="box-header with-border">
              <h3 className="box-title">Duyệt kho</h3>
              <div className="box-tools pull-right">
                {isLoading && <i className="fa fa-refresh fa-spin" />}
              </div>
            </div>
            {initialValues &&
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
                  <table className="table table-condensed table-bordered table-field-array">
                    {this.renderText()}
                  </table>
                  <table className="table table-condensed table-bordered table-field-array">
                    <FieldArray name="headlines" component={this.renderHeadlines} />
                  </table>
                  <table className="table table-condensed table-bordered table-field-array">
                    <FieldArray name="descriptions" component={this.renderDescriptions} />
                  </table>
                  <table className="table table-condensed table-bordered table-field-array">
                    <FieldArray name="medias" component={this.renderMedias} />
                  </table>
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
              </div>}
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
  isLoading: PropTypes.bool.isRequired,

  id: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  criteria: PropTypes.object.isRequired,

  onComponentMounted: PropTypes.func.isRequired,
  onFieldArrayRemoved: PropTypes.func.isRequired,
};

export default reduxForm()(InventoryReviewForm);
