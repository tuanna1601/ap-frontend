import * as _ from 'lodash';

export function generateRoleLabel(role) {
  switch (role) {
    case 'admin':
      return 'Admin';
    case 'ordinator':
      return 'Điều phối';
    case 'reviewer':
      return 'Kiểm duyệt';
    case 'marketer':
      return 'Marketer';
    case 'tbr':
      return 'TBR';
    case 'user':
      return 'Thần dân';
    default:
      break;
  }
  return '';
}

export function generateRoleOptions() {
  const roles = ['admin', 'ordinator', 'reviewer', 'marketer', 'tbr', 'user'];
  return roles.map(role => ({
    label: generateRoleLabel(role),
    value: role
  }));
}

export function generateInventoryStatusLabel(status) {
  switch (status) {
    case 'unassigned':
      return 'Chưa phân công';
    case 'assigned':
      return 'Chưa duyệt';
    case 'accepeted':
      return 'Đã duyệt';
    case 'rejected':
      return 'Đã từ chối';
    default:
      return '';
  }
}

export function generateOptionsLabel(arr) {
  return arr.map(data => ({
    value: data,
    label: data
  }));
}

export function nestChildren(id, depts) {
  const results = [];
  const filteredDepts = _.filter(depts, (dept) => dept.id !== id);
  _.each(filteredDepts, (dept) => {
    if (dept.parent === id) {
      if (dept.descendants && dept.descendants.length) {
        results.push(Object.assign({}, dept, {
          children: nestChildren(dept.id, filteredDepts)
        }));
      } else {
        results.push(dept);
      }
    }
  });
  return results;
}
