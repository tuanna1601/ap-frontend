import React, { Component, PropTypes } from 'react';
import * as _ from 'lodash';
import moment from 'moment';
import Reactable from 'reactable';

const Table = Reactable.Table;
const Thead = Reactable.Thead;
const Th = Reactable.Th;
const Tr = Reactable.Tr;
const Td = Reactable.Td;

class AdsReportList extends Component {
  componentDidMount() {
    if (!this.props.hasFilter) {
      this.props.onComponentMounted(this.props.params);
    }
  }

  render() {
    const { reports, isLoadingList, onReviewReport } = this.props;
    return (
      <div className="box box-success">
        <div className="box-header with-header">
          <h3 className="box-title">Danh sách lỗi vi phạm</h3>
          <div className="box-tools pull-right">
            {isLoadingList && <i className="fa fa-refresh fa-spin" />}
          </div>
        </div>
        <div className="box-body">
          {/* {hasFilter && <AdsFilter params={params} />}*/}
          <div className="table-responsive">
            <Table className="table table-striped table-bordered" sortable>
              <Thead>
                <Th column="title">Title</Th>
                <Th column="created">Ngày tạo</Th>
                <Th column="inventory">Người report</Th>
                <Th column="status">Trạng thái</Th>
                <Th column="action">Thao tác</Th>
              </Thead>
              {_.chain(reports)
                .orderBy(['created'], ['asc'])
                .map((report) =>
                  <Tr key={report.id}>
                    <Td column="title" className="table-col text-center">{report.title}</Td>
                    <Td column="version" className="table-col text-right">{report.version}</Td>
                    <Td column="created" className="table-col text-right">
                      {moment(report.created).format('DD-MM-YYYY')}
                    </Td>
                    <Td column="inventory" className="table-col text-center">
                      {report.creator.email}
                    </Td>
                    <Td column="status" className="table-col text-right">
                      <div>
                        {report.resolved && 'Đã xử lý'}
                        {!report.resolved && 'Chưa xử lý'}
                      </div>
                    </Td>
                    <Td column="action" className="table-col button-list">
                      <div>
                        {!report.resolved &&
                          <div className="button-list">
                            <button
                              className="btn btn-xs btn-warning btn-flat"
                              onClick={() => onReviewReport(report)}
                              title="Duyệt lỗi"
                            >
                              <i className="fa fa-fw fa-flag-o" />
                            </button>
                          </div>
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

AdsReportList.defaultProps = {
  hasFilter: false
};

AdsReportList.propTypes = {
  reports: PropTypes.object.isRequired,
  isLoadingList: PropTypes.bool.isRequired,
  hasFilter: PropTypes.bool,
  params: PropTypes.object,

  onComponentMounted: PropTypes.func.isRequired,
  onReviewReport: PropTypes.func.isRequired
};

export default AdsReportList;
