import React from 'react';
import * as _ from 'lodash';

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
    };

    this.renderTabContent = this.renderTabContent.bind(this);
    this.renderTabHeader = this.renderTabHeader.bind(this);
  }

  renderTabContent(element, index) {
    const className = this.state.activeTab === index ? 'tab-pane active' : 'tab-pane';

    return (
      <div key={index} className={className}>
        {element.props.children}
      </div>
    );
  }

  renderTabHeader(element, index) {
    const className = this.state.activeTab === index ? 'active' : '';

    return (
      <li key={index} className={className}>
        <a onClick={() => this.setState({ activeTab: index })}>{element.props.title}</a>
      </li>
    );
  }

  render() {
    return (
      <div className="nav-tabs-custom">
        <ul className="nav nav-tabs">
          {_.compact(this.props.children).map(this.renderTabHeader)}
        </ul>
        <div className="tab-content">
          {_.compact(this.props.children).map(this.renderTabContent)}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  children: React.PropTypes.array.isRequired,
};

export default Tabs;
