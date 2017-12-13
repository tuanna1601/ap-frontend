import React, { Component } from 'react';
import ReportAds from '../components/ReportAdsContainer';

class ReportAdsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createFormHidden: true,
    };
  }

  render() {
    return (
      <section className="content">
        <ReportAds type="ads" />
      </section>
    );
  }
}

export default ReportAdsPage;
