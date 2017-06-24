import React from 'react';
import Tree from 'react-ui-tree';

class DepartmentTree extends React.Component {
  constructor(props) {
    super(props);


    // this.handleChange = this.handleChange.bind(this);
    this.renderNode = this.renderNode.bind(this);
    this.state = {
      tree: this.props.tree,
    };
  }

  componentDidMount() {
    this.props.listDepartments();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tree: nextProps.tree,
    });
  }

  // handleChange(tree) {
  //   this.setState({
  //     tree
  //   });
  // }

  renderNode(node) {
    const nodeStyle = {
      padding: '10px',
      position: 'relative',
      display: 'block',
      borderBottom: '1px solid #efefef',
      borderLeft: '1px solid #efefef'
    };
    const btnStyle = {
      position: 'absolute',
      display: 'block',
      right: '0',
      top: '50%',
      transform: 'translateY(-50%)'
    };
    return (
      <span style={node.id !== 0 ? nodeStyle : {}} className="department-node">
        <span className="node-inner">
          {node.name}
          {node.id !== 0 &&
            <span style={btnStyle} className="button-list tree-button-list">
              <button
                className="btn btn-xs btn-warning btn-flat"
                onClick={() => this.props.onEdit(node)}
                title="Sửa"
              >
                <i className="fa fa-fw fa-pencil" />
              </button>
              <button
                className="btn btn-xs btn-success btn-flat"
                onClick={() => this.props.onEditOrdinators(node)}
                title="Phân quyền điều phối"
              >
                <i className="fa fa-fw fa-random" />
              </button>
              <button
                className="btn btn-xs btn-success btn-flat"
                onClick={() => this.props.onEditReviewers(node)}
                title="Phân quyền duyệt"
              >
                <i className="fa fa-fw fa-eye" />
              </button>
            </span>
          }
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
            paddingLeft={25}
            tree={this.props.tree}
            renderNode={this.renderNode}
          />
        </div>
      </div>
    );
  }
}

DepartmentTree.propTypes = {
  tree: React.PropTypes.object.isRequired,
  listDepartments: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired,
  onEditReviewers: React.PropTypes.func.isRequired,
  onEditOrdinators: React.PropTypes.func.isRequired,
};

export default DepartmentTree;
