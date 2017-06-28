import React from 'react';

const AdsLayout = ({ children }) => (
  <div className="content-wrapper">
    <section className="content-header">
      <h1>Quản lý tài khoản Facebook Ads</h1>
    </section>
    {children}
  </div>
);

AdsLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default AdsLayout;
