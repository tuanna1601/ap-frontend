import React from 'react';
import DepartmentCreate from '../components/DepartmentCreateContainer';
import DepartmentTree from '../components/DepartmentTreeContainer';

class DepartmentIndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createFormHidden: false,
    };
  }

  render() {
    return (
      <section className="content">
        <div className="box box-warning">
          <div className="box-header with-border">
            <h3 className="box-title">Tạo đơn vị mới</h3>
            <div className="box-tools pull-right">
              <button
                type="button" className="btn btn-box-tool"
                onClick={() => this.setState({ createFormHidden: !this.state.createFormHidden })}
              >
                {this.state.createFormHidden ? <i className="fa fa-plus" /> : <i className="fa fa-minus" />}
              </button>
            </div>
          </div>
          <div className="box-body" hidden={this.state.createFormHidden}>
            <div className="form-create">
              <DepartmentCreate />
            </div>
          </div>
        </div>
        <DepartmentTree />
      </section>
    );
  }
}

export default DepartmentIndexPage;
