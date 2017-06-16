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
