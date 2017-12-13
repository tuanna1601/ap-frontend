import React, { Component, PropTypes } from 'react';
import { chain } from 'lodash';
import moment from 'moment';
import Reactable from 'reactable';
import { generateInventoryStatusLabel } from '@/helpers/helper';
import renderPagination from '@/helpers/pagination';

import ReportFilter from './ReportFilterContainer';

const Table = Reactable.Table;
const Thead = Reactable.Thead;
const Th = Reactable.Th;
const Tr = Reactable.Tr;
const Td = Reactable.Td;

class ReportInventory extends Component {
  componentDidMount() {
    this.props.onComponentMounted();
  }

  componentWillUnmount() {
    this.props.resetReports();
  }

  render() {
    const {
      type,
      pagination,
      goToPage,
      isLoading,
      inventories
    } = this.props;
    const { count, limit, page } = pagination;
    return (
      <div className="box box-warning">
        <div className="box-header with-border">
          <h3 className="box-title">Danh sách kho</h3>
          <div className="box-tools pull-right">
            {isLoading && <i className="fa fa-refresh fa-spin" />}
          </div>
        </div>
        <div className="box-body">
          <ReportFilter type={type} />
          <div className="table-responsive">
            <Table className="table table-striped table-bordered">
              <Thead>
                <Th column="name">Tên kho</Th>
                <Th column="version">Version</Th>
                <Th column="created">Ngày tạo</Th>
                <Th column="department">Đơn vị</Th>
                <Th column="currentStep">Bước duyệt hiện tại</Th>
                <Th column="status">Trạng thái</Th>
              </Thead>
              {chain(inventories)
                .orderBy(['isHighlighted', 'created'], ['asc', 'asc'])
                .map((inventory) =>
                  <Tr key={inventory.id} className={inventory.isHighlighted ? 'highlighted table-row' : 'table-row'}>
                    <Td column="name" className="table-col text-center">{inventory.name}</Td>
                    <Td column="version" className="table-col text-right">{inventory.version}</Td>
                    <Td column="created" className="table-col text-right">
                      <p>
                        {moment(inventory.created).format('DD-MM-YYYY')}
                        &nbsp;
                        {moment(inventory.created).format('HH:mm')}
                      </p>
                    </Td>
                    <Td column="department" className="table-col text-center">
                      {inventory.department.name}
                    </Td>
                    <td column="currentStep" className="table-col text-right">{inventory.currentStep + 1}</td>
                    <Td column="status" className="table-col">
                      <div>
                        <table className="table table-condensed">
                          <thead>
                            <tr>
                              <th style={{ width: '15%' }}>STT</th>
                              <th>Tên bước</th>
                              <th>Trạng thái</th>
                              <th>Đơn vị duyệt</th>
                              <th>Người duyệt</th>
                              <th>Ngày duyệt</th>
                            </tr>
                          </thead>
                          <tbody>
                            {chain(inventory.steps)
                              .orderBy(['order', 'asc'])
                              .map((step, index) => (
                                <tr key={index}>
                                  <td className="text-center">{index + 1}</td>
                                  <td className="text-center">{step.title}</td>
                                  <td className="text-center">{generateInventoryStatusLabel(step.status)}</td>
                                  <th className="text-center">{step.reviewingDepartment.name}</th>
                                  <td className="text-center">
                                    {step.reviewer && step.reviewer.name}
                                    {!step.reviewer && 'N/A'}
                                  </td>
                                  <td className="text-center">
                                    {step.reviewedAt && (
                                      <p>
                                        {moment(step.reivewedAt).format('DD-MM-YYYY')}
                                        &nbsp;
                                        {moment(step.reviewedAt).format('HH:mm')}
                                      </p>
                                    )
                                    }
                                    {!step.reviewedAt && 'N/A'}
                                  </td>
                                </tr>
                              ))
                              .value()}
                          </tbody>
                        </table>
                      </div>
                    </Td>
                  </Tr>
                ).value()
              }
            </Table>
          </div>
        </div>
        <div className="box-footer clearfix">
          {renderPagination(count, limit, page, goToPage)}
        </div>
      </div>
    );
  }
}

ReportInventory.propTypes = {
  type: PropTypes.string.isRequired,
  inventories: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  onComponentMounted: PropTypes.func.isRequired,
  goToPage: PropTypes.func.isRequired,
  resetReports: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ReportInventory;
