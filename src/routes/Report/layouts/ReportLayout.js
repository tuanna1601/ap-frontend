import React from 'react';

const ReportLayout = ({ children }) => (
  <div className="content-wrapper">
    <section className="content-header">
      <h1>Báo cáo vận hành</h1>
    </section>
    {children}
  </div>
);

ReportLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default ReportLayout;
