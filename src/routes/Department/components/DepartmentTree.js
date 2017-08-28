import React from 'react';

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
      <li key={node.id}>
        <span style={node.id !== 0 ? nodeStyle : {}} className="department-node">
          <span className="node-inner">
            {node.name}
            {node.id !== 0 &&
              <span style={btnStyle} className="button-list tree-button-list">
                <button
                  className={node.isHidden ? 'btn btn-xs btn-flat' : 'btn btn-xs btn-flat btn-success'}
                  onClick={() => this.props.onToggleHidden(node)}
                  title="Ẩn/Hiện đơn vị với Marketer"
                >
                  <i
                    className={node.isHidden ? 'fa fa-fw fa-eye-slash' : 'fa fa-fw fa-eye'}
                  />
                </button>
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
                  <i className="fa fa-fw fa-tasks" />
                </button>
              </span>
            }
          </span>
        </span>
        {node.children &&
          <ul>
            {node.children.map(child => this.renderNode(child))}
          </ul>
        }
      </li>
    );
  }

  render() {
    return (
      <div className="box box-warning">
        <div className="box-header with-border">
          <h3 className="box-title">Cây đơn vị</h3>
        </div>
        <div className="box-body">
          <div className="department-tree">
            <ul>
              {this.props.tree.children.map(node => this.renderNode(node))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

DepartmentTree.propTypes = {
  tree: React.PropTypes.object.isRequired,
  listDepartments: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired,
  onToggleHidden: React.PropTypes.func.isRequired,
  onEditReviewers: React.PropTypes.func.isRequired,
  onEditOrdinators: React.PropTypes.func.isRequired,
};

export default DepartmentTree;
