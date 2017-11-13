import React from 'react';

const TabooLayout = ({ children }) => (
  <div className="content-wrapper">
    <section className="content-header">
      <h1>Quản lý danh sách từ cấm</h1>
    </section>
    {children}
  </div>
);

TabooLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default TabooLayout;
