import * as _ from 'lodash';
import * as flatnest from 'flatnest';
import xlsx from 'node-xlsx';
import saveAs from 'save-as';

export function saveAsFile(data, fileName) {
  try {
    const headers = _.keys(flatnest.flatten(data[0]));
    const rows = _.map(data, (row) => _.map(flatnest.flatten(row)));

    const buffer = xlsx.build([{ name: fileName, data: [headers, ...rows] }]);
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${fileName}.xlsx`);
  } catch (error) {
    console.error(error);
  }
}
