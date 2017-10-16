import React from 'react';
import DepartmentStepCreate from '../components/DepartmentStepCreateContainer';
import DepartmentStepList from '../components/DepartmentStepListContainer';

class DepartmentStepPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createFormHidden: false,
      location: window.location.href,
    };
  }

  render() {
    const url = new URL(this.state.location);
    const departmentId = url.searchParams.get('id');
    return (
      <section className="content">
        <div className="box box-warning">
          <div className="box-header with-border">
            <h3 className="box-title">Tạo bước duyệt kho mới</h3>
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
              <DepartmentStepCreate department={departmentId} />
            </div>
          </div>
        </div>
        {<DepartmentStepList department={departmentId} />}
      </section>
    );
  }
}

export default DepartmentStepPage;
