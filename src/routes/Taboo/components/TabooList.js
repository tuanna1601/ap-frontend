import React, { Component, PropTypes } from 'react';
import Reactable from 'reactable';
import * as _ from 'lodash';

import TabooFilter from './TabooFilterContainer';

const Table = Reactable.Table;
const Thead = Reactable.Thead;
const Th = Reactable.Th;
const Tr = Reactable.Tr;
const Td = Reactable.Td;

class TabooList extends Component {
  componentDidMount() {
    this.props.onComponentMounted();
  }

  render() {
    return (
      <div className="box box-warning">
        <div className="box-header with-border">
          <h3 className="box-title">Danh sách từ cấm</h3>
          <div className="box-tools pull-right">
            {this.props.isLoading && <i className="fa fa-refresh fa-spin" />}
          </div>
        </div>
        <div className="box-body">
          <div>
            <TabooFilter />
          </div>
          <div className="table-responsive">
            <Table className="table table-striped table-bordered" sortable>
              <Thead>
                <Th style={{ width: '90%' }} column="name">Từ cấm</Th>
                <Th style={{ width: '10%' }} column="action">Thao tác</Th>
              </Thead>
              {_.chain(this.props.taboos)
                .orderBy(['isHighlighted', 'department.id'], ['asc', 'asc'])
                .map((taboo) =>
                  <Tr key={taboo.id} className={taboo.isHighlighted ? 'highlighted table-row' : 'table-row'}>
                    <Td column="name" className="table-col">{taboo.name}</Td>
                    <Td column="action" className="table-col">
                      <div className="button-list">
                        <button
                          className="btn btn-xs btn-warning btn-flat"
                          onClick={() => this.props.onEdit(taboo)}
                          title="Sửa"
                        >
                          <i className="fa fa-fw fa-pencil" />
                        </button>
                        <button
                          className="btn btn-xs btn-danger btn-flat"
                          onClick={() => this.props.onDelete(taboo)}
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

TabooList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  taboos: PropTypes.object.isRequired,
  onComponentMounted: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TabooList;
