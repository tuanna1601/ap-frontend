import React, { Component, PropTypes } from 'react';
import AdsList from '../components/AdsListContainer';

class AdsListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: window.location.href,
    };
  }

  render() {
    const query = {
      status: ['published', 'reviewed', 'flagged', 'removing', 'removed']
    };
    return (
      <section className="content">
        <AdsList params={query} />
      </section>
    );
  }
}

AdsListPage.propTypes = {
  location: PropTypes.object,
  'location.query': PropTypes.object,
};

export default AdsListPage;
