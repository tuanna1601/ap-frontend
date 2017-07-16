import React, { Component, PropTypes } from 'react';
import AdsList from '../components/AdsListContainer';

class AdsListFlaggedPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: window.location.href,
    };
  }

  render() {
    const query = {
      status: 'flagged'
    };
    return (
      <section className="content">
        <AdsList params={query} />
      </section>
    );
  }
}

AdsListFlaggedPage.propTypes = {
  location: PropTypes.object,
  'location.query': PropTypes.object,
};

export default AdsListFlaggedPage;
