import { connect } from 'react-redux';
import { Alert } from 'react-s-alert';

import { showConfirm } from '@/store/modal';
import { listAdAccount, deleteAdAccount } from '../redux/ads';
import AdAccountList from './AdAccountList';

const mapStateToProps = (state) => ({
  adAccounts: state.ads.adAccounts,
  isLoading: state.ads.isLoadingList
});

const mapDispatchToProps = (dispatch) => ({
  onComponentMounted: () => {
    dispatch(listAdAccount());
  },
  onDelete: (account) => {
    dispatch(showConfirm(`Bạn có chắc chắc muốn xoá Ad Account ${account.name}?`,
      () => dispatch(deleteAdAccount(account.id, (data) => {
        Alert.success(`${data.name} đã được xoá thành công`);
      }))
    ));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdAccountList);
