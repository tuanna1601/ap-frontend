import React, { PropTypes } from 'react';
import * as _ from 'lodash';
import moment from 'moment';
import Reactable from 'reactable';

import { generateAdStatusLabel } from '@/helpers/helper';

import AdsFilter from './AdsFilterContainer';

const Table = Reactable.Table;
const Thead = Reactable.Thead;
const Th = Reactable.Th;
const Tr = Reactable.Tr;
const Td = Reactable.Td;

class AdsList extends React.Component {
  componentDidMount() {
    if (!this.props.hasFilter) {
      this.props.onComponentMounted(this.props.params);
    }
  }

  render() {
    const { params, ads, isLoadingList, onReviewAds, hasFilter } = this.props;

    return (
      <div className="box box-success">
        <div className="box-header with-header">
          <h3 className="box-title">Danh sách Ads</h3>
          <div className="box-tools pull-right">
            {isLoadingList && <i className="fa fa-refresh fa-spin" />}
          </div>
        </div>
        <div className="box-body">
          {hasFilter && <AdsFilter params={params} />}
          <div className="table-responsive">
            <Table className="table table-striped table-bordered" sortable>
              <Thead>
                <Th column="name">Tên Ad</Th>
                <Th column="created">Ngày tạo</Th>
                <Th column="inventory">Kho</Th>
                <Th column="status">Trạng thái</Th>
                <Th column="action">Thao tác</Th>
              </Thead>
              {_.chain(ads)
                .orderBy(['created'], ['asc'])
                .map((ad) =>
                  <Tr key={ad.id}>
                    <Td column="name" className="table-col text-center">{ad.name}</Td>
                    <Td column="version" className="table-col text-right">{ad.version}</Td>
                    <Td column="created" className="table-col text-right">
                      {moment(ad.created).format('DD-MM-YYYY')}
                    </Td>
                    <Td column="inventory" className="table-col text-center">
                      {ad.inventory.name}
                    </Td>
                    <Td column="status" className="table-col text-right">
                      {generateAdStatusLabel(ad.status)}
                    </Td>
                    <Td column="action" className="table-col button-list">
                      <div className="button-list">
                        <button
                          className="btn btn-xs btn-primary btn-flat"
                          onClick={() => onReviewAds(ad)}
                          title="Hậu kiểm Ad"
                        >
                          <i className="fa fa-fw fa-facebook" />
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

AdsList.defaultProps = {
  hasFilter: true
};

AdsList.propTypes = {
  ads: PropTypes.object.isRequired,

  params: PropTypes.object,
  hasFilter: PropTypes.bool,
  isLoadingList: PropTypes.bool.isRequired,

  onComponentMounted: PropTypes.func.isRequired,
  onReviewAds: PropTypes.func.isRequired,
};

export default AdsList;
