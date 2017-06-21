import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import 'react-ui-tree/dist/react-ui-tree.css';

import { reduce } from 'lodash';
import { updateDepartmentTree } from '../redux/department';
import DepartmentTree from './DepartmentTree';

function flattenChildren(descendants) {
  return reduce(descendants, (desArr, des) => {
    desArr.push({
      id: des.id,
      name: des.name,
      children: flattenChildren(des.descendants)
    });
    return desArr;
  }, []);
}

const mapStateToProps = (state) => ({
  tree: {
    id: 0,
    name: '/',
    children: flattenChildren(state.department.nestedDepartments),
  },
  isHighlighted: state.department.isHighlighted
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (tree) => dispatch(updateDepartmentTree(tree, () => {
    Alert.success('Cây đơn vị đã được cập nhật thành công');
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentTree);
