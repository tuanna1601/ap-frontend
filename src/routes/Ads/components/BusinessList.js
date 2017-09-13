import React, { Component, PropTypes } from 'react';
import Reactable from 'reactable';
import * as _ from 'lodash';

const Table = Reactable.Table;
const Thead = Reactable.Thead;
const Th = Reactable.Th;
const Tr = Reactable.Tr;
const Td = Reactable.Td;

class BusinessList extends Component {
  componentDidMount() {
    this.props.onComponentMounted();
  }

  render() {
    return (
      <div className="box box-warning">
        <div className="box-header with-border">
          <h3 className="box-title">Danh sách Business</h3>
          <div className="box-tools pull-right">
            {this.props.isLoading && <i className="fa fa-refresh fa-spin" />}
          </div>
        </div>
        <div className="box-body">
          <div className="table-responsive">
            <Table className="table table-striped table-bordered" sortable>
              <Thead>
                <Th style={{ width: '35%' }} column="name">Tên business</Th>
                <Th style={{ width: '35%' }} column="businessId">Business ID</Th>
                <Th style={{ width: '20%' }} column="activate">Kích hoạt</Th>
                <Th style={{ width: '10%' }} column="action">Thao tác</Th>
              </Thead>
              {_.chain(this.props.businesses)
                .orderBy(['isHighlighted', 'department.id'], ['asc', 'asc'])
                .map((business) =>
                  <Tr key={business.id} className={business.isHighlighted ? 'highlighted table-row' : 'table-row'}>
                    <Td column="name" className="table-col">{business.name}</Td>
                    <Td column="businessId" className="table-col">
                      {business.businessId}
                    </Td>
                    <Td column="activate" className="table-col text-center">
                      <button
                        className="btn btn-box-tool"
                        onClick={() => this.props.onActivate(business)}
                      >
                        <i
                          className={business.activated ?
                            'fa fa-fw fa-check-square text-green' :
                            'fa fa-fw fa-check-square'}
                        />
                      </button>
                    </Td>
                    <Td column="action" className="table-col">
                      <div className="button-list">
                        <button
                          className="btn btn-xs btn-danger btn-flat"
                          onClick={() => this.props.onDelete(business)}
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

BusinessList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  businesses: PropTypes.object.isRequired,
  onComponentMounted: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onActivate: PropTypes.func.isRequired,
};

export default BusinessList;
