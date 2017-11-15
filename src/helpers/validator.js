import moment from 'moment';
import * as _ from 'lodash';

export default class Validator {
  constructor(arg) {
    this.value = arg;
  }

  validateBoolean() {
    if (!this.message && !(this.value === true || this.value === false)) {
      this.message = 'Thông tin bắt buộc';
      this.hasError = true;
    }
    return this;
  }


  validateRequired() {
    if (!this.message && (_.isUndefined(this.value) || _.isNull(this.value) || this.value.length === 0)) {
      this.message = 'Thông tin bắt buộc';
      this.hasError = true;
    }
    return this;
  }

  validateEmail() {
    if (!this.message && !this.hasError && this.value
      && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.value)) {
      this.message = 'Email không hợp lệ';
      this.hasError = true;
    }
    return this;
  }

  validatePhone() {
    if (!this.message && !this.hasError && this.value
      && !/^[[0-9]{8,11}$/i.test(this.value)) {
      this.message = 'Số điện thoại không hợp lệ';
      this.hasError = true;
    }
    return this;
  }

  validateMinDate(min) {
    const date = moment(min);
    if (!this.message && !this.hasError && this.value && date.isAfter(moment(this.value))) {
      this.message = `Giá trị phải sau ${date.format('DD-MM-YYYY')}`;
      this.hasError = true;
    }
    return this;
  }

  validateMaxDate(min) {
    const date = moment(min);
    if (!this.message && !this.hasError && this.value && date.isBefore(moment(this.value))) {
      this.message = `Giá trị phải trước ${date.format('DD-MM-YYYY')}`;
      this.hasError = true;
    }
    return this;
  }

  validateGreaterOrEqual(min) {
    if (!this.message && !this.hasError && Number(this.value) < min) {
      this.message = `Giá trị phải lớn hơn hoặc bằng ${min}`;
      this.hasError = true;
    }
    return this;
  }

  validateLessOrEqual(max) {
    if (!this.message && !this.hasError && Number(this.value) > max) {
      this.message = `Giá trị phải nhỏ hơn hoặc bằng ${max}`;
      this.hasError = true;
    }
    return this;
  }

  validateEqual(target) {
    if (!this.message && !this.hasError && Number(this.value) !== target) {
      this.message = `Giá trị phải bằng ${target}`;
      this.hasError = true;
    }
    return this;
  }

  validateUnique(existingIds) {
    if (!this.message && !this.hasError && existingIds[this.value] > 1) {
      this.message = 'Giá trị bị trùng';
      this.hasError = true;
    }
    return this;
  }

  validateInteger() {
    if (!this.message && !_.isInteger(Number(this.value))) {
      this.message = 'Giá trị phải là số nguyên';
      this.hasError = true;
    }
    return this;
  }

  validateFile(ext) {
    if (!this.value) {
      this.message = 'Chưa chọn file';
      this.hasError = true;
    } else if (ext.indexOf(this.value.name.split('.').pop()) < 0) {
      this.message = 'Sai định dạng file';
      this.hasError = true;
    }
    return this;
  }

  validateURL(domains) {
    if (!this.message && !this.hasError) {
      let matched = false;
      for (const domain of domains) {
        const regex = new RegExp(`^https?://${domain}|^${domain}`, 'igm');
        matched = regex.exec(this.value);
        if (matched) {
          return this;
        }
      }
      if (!matched) {
        this.message = `Hệ thống chỉ nhận file từ ${domains.join(' và ')}`;
        this.hasError = true;
      }
    }
    return this;
  }

  validateArrayLength(length) {
    if (!this.message && !this.hasError && this.value && this.value.length < length) {
      this.message = `Cần ít nhất ${length} phần tử`;
      this.hasError = true;
    }
    return this;
  }

  getMessage() {
    return this.hasError && this.message;
  }
}
