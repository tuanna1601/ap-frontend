import React from 'react';

const DepartmentLayout = ({ children }) => (
  <div className="content-wrapper">
    <section className="content-header">
      <h1>Đơn vị</h1>
    </section>
    {children}
  </div>
);

DepartmentLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default DepartmentLayout;
