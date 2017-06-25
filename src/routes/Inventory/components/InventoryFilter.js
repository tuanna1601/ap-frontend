import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { FormControlMultiSelect } from '@/components/FormControl';

import { generateInventoryStatusOptions } from '@/helpers/helper';

class InventoryFilter extends Component {
  componentDidMount() {
    this.props.onComponentMounted();
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} className="box-filter">
        <div className="row">
          <div className="col-md-6">
            <Field
              component={FormControlMultiSelect}
              options={generateInventoryStatusOptions(this.props.isReviewer)}
              id="status" name="status"
              label="Trạng thái"
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-default btn-flat" type="submit" title="Lọc" disabled={this.props.submitting}>
              <i className="fa fa-search" />
            </button>
          </div>
        </div>
      </form>
    );
  }
}

InventoryFilter.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onComponentMounted: PropTypes.func.isRequired,
  isReviewer: PropTypes.bool,
};

export default reduxForm()(InventoryFilter);
