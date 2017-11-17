import React, { Component, PropTypes } from 'react';
import { chain } from 'lodash';

class DepartmentStepList extends Component {
  componentDidMount() {
    this.props.onComponentMounted();
  }

  render() {
    return (
      <div className="box box-warning">
        <div className="box-header with-border">
          <h3 className="box-title">Danh sách bước duyệt</h3>
          <div className="box-tools pull-right">
            {this.props.isLoading && <i className="fa fa-refresh fa-spin" />}
          </div>
        </div>
        <div className="box-body">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>STT</th>
                  <th>Tên bước</th>
                  <th>Đơn vị duyệt</th>
                  <th>Tự động hoàn thành sau</th>
                  <th>Hình thức tự động hoàn thành</th>
                  <th>Thông báo</th>
                  <th>Thao tác</th>
                  <th>Sắp xếp</th>
                </tr>
              </thead>
              <tbody>
                {chain(this.props.steps).orderBy('order', 'asc').map((step, index) => (
                  <tr key={step.id}>
                    <td className="text-center">{index + 1}</td>
                    <td>{step.title}</td>
                    <td className="text-center">{step.reviewingDepartment.name}</td>
                    <td className="text-center">{step.autoClearanceAfter} ngày</td>
                    <td className="text-center">{step.autoClearanceType === 'accepted' ? 'Chấp nhận' : 'Từ chối'}</td>
                    <td className="text-center">{step.notificationType === 'email' ? 'Email' : 'SMS'}</td>
                    <td>
                      <div className="btn-list">
                        <button
                          className="btn btn-xs btn-warning btn-flat"
                          title="Sửa"
                          onClick={() => this.props.onEdit(step)}
                        >
                          <i className="fa fa-pencil" />
                        </button>
                        <button
                          className="btn btn-xs btn-danger btn-flat"
                          title="Xoá"
                          onClick={() => this.props.onDelete(step)}
                        >
                          <i className="fa fa-trash" />
                        </button>
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="btn-group-vertical">
                        <button
                          className="btn btn-xs btn-default"
                          disabled={index - 1 < 0}
                          onClick={() => this.props.onChangeStepOrder(step, index - 1)}
                        >
                          <i className="fa fa-caret-up" />
                        </button>
                        <button
                          className="btn btn-xs btn-default"
                          disabled={this.props.steps.length === index + 1}
                          onClick={() => this.props.onChangeStepOrder(step, index + 1)}
                        >
                          <i className="fa fa-caret-down" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )).value()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

DepartmentStepList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  steps: PropTypes.array.isRequired,
  onComponentMounted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeStepOrder: PropTypes.func.isRequired,

  department: PropTypes.string.isRequired,
};

export default DepartmentStepList;
