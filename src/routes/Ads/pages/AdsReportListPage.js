import React, { Component, PropTypes } from 'react';
import AdsReportList from '../components/AdsReportListContainer';

class AdsReportListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: window.location.href,
    };
  }

  render() {
    return (
      <section className="content">
        <AdsReportList params={this.props.location.query} />
      </section>
    );
  }
}

AdsReportListPage.propTypes = {
  location: PropTypes.object,
  'location.query': PropTypes.object,
};

export default AdsReportListPage;
