import React from 'react';

const SidebarTree = ({ treeId, className, children, currentItem }) => {
  return (
    <li
      className={(currentItem && currentItem.indexOf(treeId) === 0) ?
     `${className} child-item-active` : `${className}`}
    >
      {children}
    </li>
  );
};

SidebarTree.propTypes = {
  children: React.PropTypes.array.isRequired,
  active: React.PropTypes.bool,
  treeId: React.PropTypes.string.isRequired,
  className: React.PropTypes.string.isRequired,
  currentItem: React.PropTypes.string
};


export default SidebarTree;
