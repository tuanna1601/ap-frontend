import React, { Component, PropTypes } from 'react';
import Reactable from 'reactable';
import * as _ from 'lodash';

const Table = Reactable.Table;
const Thead = Reactable.Thead;
const Th = Reactable.Th;
const Tr = Reactable.Tr;
const Td = Reactable.Td;

class AdAccountList extends Component {
  componentDidMount() {
    this.props.onComponentMounted();
  }

  render() {
    return (
      <div className="box box-success">
        <div className="box-header with-border">
          <h3 className="box-title">Danh sách Ad Account</h3>
          <div className="box-tools pull-right">
            {this.props.isLoading && <i className="fa fa-refresh fa-spin" />}
          </div>
        </div>
        <div className="box-body">
          <div className="table-responsive">
            <Table className="table table-striped table-bordered" sortable>
              <Thead>
                <Th style={{ width: '45%' }} column="name">Tên account</Th>
                <Th style={{ width: '45%' }} column="accountId">Account ID</Th>
                <Th style={{ width: '10%' }} column="action">Thao tác</Th>
              </Thead>
              {_.chain(this.props.adAccounts)
                .orderBy(['isHighlighted', 'department.id'], ['asc', 'asc'])
                .map((account) =>
                  <Tr key={account.id} className={account.isHighlighted ? 'highlighted table-row' : 'table-row'}>
                    <Td column="name" className="table-col">{account.name}</Td>
                    <Td column="accountId" className="table-col">
                      {account.accountId}
                    </Td>
                    <Td column="action" className="table-col">
                      <div className="button-list">
                        <button
                          className="btn btn-xs btn-danger btn-flat"
                          onClick={() => this.props.onDelete(account)}
                          title="Xoá"
                        >
                          <i className="fa fa-fw fa-trash" />
                        </button>
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

AdAccountList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  adAccounts: PropTypes.object.isRequired,
  onComponentMounted: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AdAccountList;
