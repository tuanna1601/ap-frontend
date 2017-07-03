import React from 'react';
import AdsReviewForm from '../components/AdsReviewContainer';

class AdsReviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: window.location.href,
    };
  }

  render() {
    const url = new URL(this.state.location);
    const adId = url.searchParams.get('id');
    return (
      <section className="content">
        <AdsReviewForm id={adId} />
      </section>
    );
  }
}

export default AdsReviewPage;
