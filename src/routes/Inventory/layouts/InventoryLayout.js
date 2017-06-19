import React from 'react';

const InventoryLayout = ({ children }) => (
  <div className="content-wrapper">
    <section className="content-header">
      <h1>Quản lý kho</h1>
    </section>
    {children}
  </div>
);

InventoryLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default InventoryLayout;
