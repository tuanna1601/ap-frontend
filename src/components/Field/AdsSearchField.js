import React, { PropTypes } from 'react';
import { Field } from 'redux-form';

import { FormControl } from '@/components/FormControl';

import { debounce } from 'lodash';

class AdsSearchField extends React.Component {
  componentWillMount() {
    this.search = debounce((event) => {
      this.props.listOptions(event.target.value);
    });
  }

  componentWillUnmount() {
    this.props.resetOptions();
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="search" className="control-label">
            Tìm kiếm
          </label>
          <input
            id="search" name="search"
            type="text" className="form-control"
            onChange={(event) => {
              event.persist();
              this.search(event);
            }}
          />
        </div>
        <table className="table">
          <tbody>
            <tr>
              <td>
                &nbsp;
              </td>
              <td className="text-right">
                <input
                  type="checkbox"
                  id="selectAll"
                  name="selectAll"
                  onChange={(event) => {
                    event.persist();
                    this.props.onSelectAll(event, this.props.ads);
                  }}
                />
              </td>
            </tr>
            {this.props.ads.map((ad, index) => (
              <tr key={ad.id}>
                <td>
                  <label htmlFor={`selected[${index}]`}>
                    {ad.name}
                  </label>
                </td>
                <td className="text-right">
                  <Field
                    type="checkbox" component="input"
                    id={`selected[${index}]`}
                    name={`selected[${index}]`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

AdsSearchField.propTypes = {
  ads: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  listOptions: PropTypes.func.isRequired,
  resetOptions: PropTypes.func.isRequired,
};

export default AdsSearchField;
