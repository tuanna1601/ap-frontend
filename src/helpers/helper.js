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

export function nestDescendants(id, depts) {
  if (!depts[id] || !depts[id].descendants.length) {
    return depts[id];
  }
  return Object.assign({}, depts[id], {
    descendants: _.map(depts[id].descendants, des => nestDescendants(des, depts))
  });
}
