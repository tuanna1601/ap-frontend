import React from 'react';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';

import { showForm } from '@/store/modal';

import { resolveReport, rejectReport, listAdsReports } from '../redux/ads';

import AdsReportList from './AdsReportList';
import AdsResolveReportForm from './AdsResolveReportContainer';

const mapStateToProps = (state) => ({
  reports: state.ads.reports,
  isLoadingList: state.ads.isLoadingList,
});

const mapDispatchToProps = (dispatch) => ({
  onReviewReport: (report) => {
    const resolveForm = (
      <AdsResolveReportForm
        form="ads-resolve-report"
        initialValues={report}
      />
    );
    dispatch(showForm('Xử lý báo cáo vi phạm', resolveForm, ({ values, isAccepted }) => {
      if (isAccepted) {
        dispatch(resolveReport(values, (data) => {
          Alert.success(`Tick ${data.title} đã được gắn cờ thành công`);
        }));
      } else {
        const formattedValues = {
          resolve: true
        };
        dispatch(rejectReport(values.id, formattedValues, (data) => {
          Alert.success(`Tick ${data.title} đã được xử lý thành công`);
        }));
      }
    }));
  },
  onComponentMounted: (params) => {
    dispatch(listAdsReports(params));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(AdsReportList);
