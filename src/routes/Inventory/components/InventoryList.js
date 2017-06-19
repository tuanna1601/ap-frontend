import React from 'react';
import * as _ from 'lodash';
import moment from 'moment';
import Reactable from 'reactable';
import { generateInventoryStatusLabel } from '@/helpers/helper';

const Table = Reactable.Table;
const Thead = Reactable.Thead;
const Th = Reactable.Th;
const Tr = Reactable.Tr;
const Td = Reactable.Td;

class InventoryList extends React.Component {
  componentDidMount() {
    this.props.listInventories();
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="box box-success">
        <div className="box-header with-border">
          <h3 className="box-title">Danh sách kho</h3>
          <div className="box-tools pull-right">
            {this.props.isLoadingList && <i className="fa fa-refresh fa-spin" />}
          </div>
        </div>
        <div className="box-body">
          <div className="table-responsive">
            <Table className="table table-striped table-bordered" sortable>
              <Thead>
                <Th column="name">Mã kho</Th>
                <Th column="version">Version</Th>
                <Th column="created">Ngày tạo</Th>
                <Th column="status">Trạng thái</Th>
                <Th column="action">Thao tác</Th>
              </Thead>
              {_.chain(this.props.inventories)
                .orderBy(['isHighlighted', 'name'], ['asc', 'asc'])
                .map((inventory) =>
                  <Tr key={inventory.id} className={inventory.isHighlighted ? 'highlighted table-row' : 'table-row'}>
                    <Td column="name" className="table-col text-center">{inventory.name}</Td>
                    <Td column="version" className="table-col text-right">{inventory.version}</Td>
                    <Td column="created" className="table-col text-right">
                      {moment(inventory.created).format('DD-MM-YYYY')}
                    </Td>
                    <Td column="status" className="table-col text-right">
                      {generateInventoryStatusLabel(inventory.status)}
                    </Td>
                    <Td column="action" className="table-col button-list">
                      <button
                        className="btn btn-xs btn-warning btn-flat"
                        onClick={() => this.props.onEdit(inventory)}
                        title="Sửa"
                      >
                        <i className="fa fa-fw fa-pencil" />
                      </button>
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
  inventories: React.PropTypes.object.isRequired,
  pagination: React.PropTypes.object.isRequired,
  listInventories: React.PropTypes.func.isRequired,
  setFilterQuery: React.PropTypes.func.isRequired,
  resetCurrentPage: React.PropTypes.func.isRequired,

  isLoadingList: React.PropTypes.bool.isRequired,
  onEdit: React.PropTypes.func.isRequired,
};

export default InventoryList;
