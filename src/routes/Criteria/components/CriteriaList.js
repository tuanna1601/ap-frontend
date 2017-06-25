import React, { Component, PropTypes } from 'react';
import Reactable from 'reactable';
import * as _ from 'lodash';

import CriteriaFilter from './CriteriaFilterContainer';

const Table = Reactable.Table;
const Thead = Reactable.Thead;
const Th = Reactable.Th;
const Tr = Reactable.Tr;
const Td = Reactable.Td;

class CriteriaList extends Component {
  componentDidMount() {
    this.props.onComponentMounted();
  }

  render() {
    return (
      <div className="box box-success">
        <div className="box-header with-border">
          <h3 className="box-title">Danh sách tiêu chí</h3>
          <div className="box-tools pull-right">
            {this.props.isLoading && <i className="fa fa-refresh fa-spin" />}
          </div>
        </div>
        <div className="box-body">
          <div>
            <CriteriaFilter />
          </div>
          <div className="table-responsive">
            <Table className="table table-striped table-bordered" sortable>
              <Thead>
                <Th style={{ width: '45%' }} column="name">Tiêu chí</Th>
                <Th style={{ width: '45%' }} column="department">Đơn vị</Th>
                <Th style={{ width: '10%' }} column="action">Thao tác</Th>
              </Thead>
              {_.chain(this.props.criteria)
                .orderBy(['isHighlighted', 'department.id'], ['asc', 'asc'])
                .map((criterion) =>
                  <Tr key={criterion.id} className={criterion.isHighlighted ? 'highlighted table-row' : 'table-row'}>
                    <Td column="name" className="table-col">{criterion.name}</Td>
                    <Td column="department" className="table-col text-center">
                      {criterion.department ? criterion.department.name : 'N/A'}
                    </Td>
                    <Td column="action" className="table-col">
                      <div className="button-list">
                        <button
                          className="btn btn-xs btn-warning btn-flat"
                          onClick={() => this.props.onEdit(criterion)}
                          title="Sửa"
                        >
                          <i className="fa fa-fw fa-pencil" />
                        </button>
                        <button
                          className="btn btn-xs btn-danger btn-flat"
                          onClick={() => this.props.onDelete(criterion)}
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

CriteriaList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  criteria: PropTypes.object.isRequired,
  onComponentMounted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CriteriaList;
