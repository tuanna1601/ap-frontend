import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import moment from 'moment';
import Reactable from 'reactable';
import { generateInventoryStatusLabel } from '@/helpers/helper';

import InventoryFilter from './InventoryFilterContainer';

const Table = Reactable.Table;
const Thead = Reactable.Thead;
const Th = Reactable.Th;
const Tr = Reactable.Tr;
const Td = Reactable.Td;

class InventoryList extends Component {
  componentDidMount() {
    if (this.props.isOrdinator) {
      this.props.listOrdinatorInventories();
    } else {
      this.props.listInventories();
    }
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
          <InventoryFilter params={this.props.params} isOrdinator={this.props.isOrdinator} />
          <div className="table-responsive">
            <Table className="table table-striped table-bordered" sortable>
              <Thead>
                <Th column="name">Tên kho</Th>
                <Th column="version">Version</Th>
                <Th column="created">Ngày tạo</Th>
                <Th column="department">Đơn vị</Th>
                <Th column="status">Trạng thái</Th>
                <Th column="action">Thao tác</Th>
              </Thead>
              {_.chain(this.props.inventories)
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
                    <Td column="status" className="table-col text-right">
                      {generateInventoryStatusLabel(inventory.status)}
                    </Td>
                    <Td column="action" className="table-col button-list">
                      <div className="button-list">
                        {!this.props.isOrdinator &&
                          <button
                            className="btn btn-xs btn-warning btn-flat"
                            onClick={() => this.props.onEdit(inventory)}
                            title="Sửa"
                          >
                            <i className="fa fa-fw fa-pencil" />
                          </button>
                        }
                        {!this.props.isOrdinator &&
                          inventory.status !== 'rejected' &&
                          inventory.status !== 'unassigned' &&
                          <button
                            className="btn btn-xs btn-primary btn-flat"
                            onClick={() => this.props.onCreateAds(inventory)}
                            title="Tạo quảng cáo"
                          >
                            <i className="fa fa-fw fa-facebook" />
                          </button>
                        }
                        {this.props.isOrdinator && !inventory.reviewer &&
                          <button
                            className="btn btn-xs btn-success btn-flat"
                            onClick={() => this.props.onAssign(inventory)}
                            title="Phân công"
                          >
                            <i className="fa fa-fw fa-random" />
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

InventoryList.propTypes = {
  inventories: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  listInventories: PropTypes.func.isRequired,
  listOrdinatorInventories: PropTypes.func.isRequired,
  setFilterQuery: PropTypes.func.isRequired,
  resetCurrentPage: PropTypes.func.isRequired,
  resetInventories: PropTypes.func.isRequired,

  params: PropTypes.object,
  isOrdinator: PropTypes.bool,
  isLoadingList: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onAssign: PropTypes.func.isRequired,
  onCreateAds: PropTypes.func.isRequired,
};

export default InventoryList;
