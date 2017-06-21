import React from 'react';
import Tree from 'react-ui-tree';

class DepartmentTree extends React.Component {
  constructor(props) {
    super(props);


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      tree: this.props.tree,
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tree: nextProps.tree,
    });
  }

  handleChange(tree) {
    this.setState({
      tree
    });
  }

  handleSubmit() {
    this.props.onSubmit(this.state.tree);
  }

  renderNode(node) {
    return (
      <span className="department-node">
        {node.name}
        <span className="button-list">
          1
        </span>
      </span>
    );
  }

  render() {
    return (
      <div className="box box-success">
        <div className="box-header with-border">
          <h3 className="box-title">Cây đơn vị</h3>
        </div>
        <div className="box-body">
          <Tree
            paddingLeft={50}
            tree={this.props.tree}
            onChange={this.handleChange}
            renderNode={this.renderNode}
          />
        </div>
        <div className="box-footer">
          <button className="btn btn-success btn-flat" type="button" onClick={this.handleSubmit}>
            <i className="fa fa-save" />
          </button>
        </div>
      </div>
    );
  }
}

DepartmentTree.propTypes = {
  tree: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};

export default DepartmentTree;
