import React, { Component, PropTypes } from 'react';
import { chain } from 'lodash';
import moment from 'moment';
import Reactable from 'reactable';
import { generateInventoryStatusLabel } from '@/helpers/helper';

import InventoryFilter from './InventoryFilterContainer';

const Table = Reactable.Table;
const Thead = Reactable.Thead;
const Th = Reactable.Th;
const Tr = Reactable.Tr;
const Td = Reactable.Td;

class InventoryReviewerList extends Component {
  componentDidMount() {
    // this.props.listInventories();
  }

  componentWillUnmount() {
    this.props.resetInventories();
  }

  render() {
    return (
      <div className="box box-warning">
        <div className="box-header with-border">
          <h3 className="box-title">Danh sách kho</h3>
          <div className="box-tools pull-right">
            {this.props.isLoadingList && <i className="fa fa-refresh fa-spin" />}
          </div>
        </div>
        <div className="box-body">
          <InventoryFilter params={this.props.params} isReviewer />
          <div className="table-responsive">
            <Table className="table table-striped table-bordered" sortable>
              <Thead>
                <Th column="name">Tên kho</Th>
                <Th column="version">Version</Th>
                <Th column="created">Ngày tạo</Th>
                <Th column="department">Đơn vị</Th>
                <Th column="currentStep">Bước duyệt hiện tại</Th>
                <Th column="status">Trạng thái</Th>
                <Th column="action">Thao tác</Th>
              </Thead>
              {chain(this.props.inventories)
                .orderBy(['isHighlighted', 'created'], ['asc', 'asc'])
                .map((inventory) =>
                  <Tr key={inventory.id} className={inventory.isHighlighted ? 'highlighted table-row' : 'table-row'}>
                    <Td column="name" className="table-col text-center">{inventory.name}</Td>
                    <Td column="version" className="table-col text-right">{inventory.version}</Td>
                    <Td column="created" className="table-col text-right">
                      {moment(inventory.created).format('DD-MM-YYYY')}
                    </Td>
                    <Td column="department" className="table-col text-center">
                      {inventory.department.name}
                    </Td>
                    <Td column="currentStep" className="table-col text-center">
                      {inventory.currentStep + 1}
                    </Td>
                    <Td column="status" className="table-col">
                      <table className="table table-condensed">
                        <thead>
                          <tr>
                            <th style={{ width: '15%' }}>STT</th>
                            <th>Tên bước</th>
                            <th>Trạng thái</th>
                            <th>Người duyệt</th>
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
                                <td className="text-center">
                                  {step.reviewer && step.reviewer.name}
                                  {!step.reviewer && 'N/A'}
                                </td>
                              </tr>
                            ))
                            .value()}
                        </tbody>
                      </table>
                    </Td>
                    <Td column="action" className="table-col button-list">
                      <div className="button-list">
                        {inventory.status !== 'accepted' &&
                          <button
                            className="btn btn-xs btn-success btn-flat"
                            onClick={() => this.props.onReview(inventory)}
                            title="Duyệt"
                          >
                            <i className="fa fa-fw fa-tasks" />
                          </button>
                        }
                      </div>
                    </Td>
                  </Tr>
                ).value()
              }
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

InventoryReviewerList.propTypes = {
  inventories: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  listInventories: PropTypes.func.isRequired,
  resetInventories: PropTypes.func.isRequired,
  setFilterQuery: PropTypes.func.isRequired,
  resetCurrentPage: PropTypes.func.isRequired,

  params: PropTypes.object,
  isOrdinator: PropTypes.bool,
  isLoadingList: PropTypes.bool.isRequired,
  onReview: PropTypes.func.isRequired,
};

export default InventoryReviewerList;
