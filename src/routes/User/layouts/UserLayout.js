import React from 'react';

const UserLayout = ({ children }) => (
  <div className="content-wrapper">
    <section className="content-header">
      <h1>Quản lý nhân viên</h1>
    </section>
    {children}
  </div>
);

UserLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default UserLayout;
