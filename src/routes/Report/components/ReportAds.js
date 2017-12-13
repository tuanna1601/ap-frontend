import React, { Component, PropTypes } from 'react';
import { chain } from 'lodash';
import moment from 'moment';
import Reactable from 'reactable';
import { generateAdStatusLabel } from '@/helpers/helper';
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
      ads
    } = this.props;
    const { count, limit, page } = pagination;
    return (
      <div className="box box-warning">
        <div className="box-header with-border">
          <h3 className="box-title">Danh sách quảng cáo</h3>
          <div className="box-tools pull-right">
            {isLoading && <i className="fa fa-refresh fa-spin" />}
          </div>
        </div>
        <div className="box-body">
          <ReportFilter type={type} />
          <div className="table-responsive">
            <Table className="table table-striped table-bordered">
              <Thead>
                <Th column="name">Tên Ads</Th>
                <Th column="created">Ngày tạo</Th>
                <Th column="creator">Người tạo</Th>
                <Th column="department">Đơn vị</Th>
                <Th column="inventory">Kho nguyên liệu</Th>
                <Th column="status">Trạng thái</Th>
                <Th column="noteReview">Nội dung hậu kiểm</Th>
                <Th column="noteFlag">Nội dung gắn cờ</Th>
              </Thead>
              {chain(ads)
                .orderBy(['isHighlighted', 'created'], ['asc', 'asc'])
                .map((ad) =>
                  <Tr key={ad.id} className={ad.isHighlighted ? 'highlighted table-row' : 'table-row'}>
                    <Td column="name" className="table-col text-center">{ad.name}</Td>
                    <Td column="created" className="table-col text-right">
                      <p>
                        {moment(ad.created).format('DD-MM-YYYY')}
                        &nbsp;
                        {moment(ad.created).format('HH:mm')}
                      </p>
                    </Td>
                    <Td column="creator" className="table-col text-center">
                      <p>
                        {ad.creator.name}
                        <br />
                        {ad.creator.email}
                      </p>
                    </Td>
                    <Td column="department" className="table-col text-center">
                      {ad.inventory.department.name}
                    </Td>
                    <Td column="inventory" className="table-col text-center">
                      {ad.inventory.name}
                    </Td>
                    <Td column="status" className="table-col">
                      {generateAdStatusLabel(ad.status)}
                    </Td>
                    <Td column="noteReview">{ad.noteReview}</Td>
                    <Td column="noteFlag">{ad.noteFlag}</Td>
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
  ads: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  onComponentMounted: PropTypes.func.isRequired,
  goToPage: PropTypes.func.isRequired,
  resetReports: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ReportInventory;
