import React from 'react';
import { Field } from 'redux-form';
import { chain } from 'lodash';
import { FormControlSelect } from '@/components/FormControl';

class UserField extends React.Component {
  constructor(props) {
    super(props);

    this.listUsersCallback = this.listUsersCallback.bind(this);

    this.state = {
      options: [],
    };
  }


  componentDidMount() {
    this.props.listOptions((data) => this.listUsersCallback(data));
  }

  listUsersCallback(users) {
    const { filterOptions, userRole } = this.props;
    const options = chain(users)
      .filter(user => (filterOptions ? filterOptions.indexOf(user.id) < 0 : true))
      .filter(user => (userRole ? user.roles.indexOf(userRole) > -1 : true))
      .map((user) => ({
        value: user.id,
        label: user.name,
        user
      }))
      .value();
    this.setState({
      options,
    });
  }

  render() {
    return (
      <Field
        component={FormControlSelect}
        options={this.state.options}
        {...this.props}
      />
    );
  }
}

UserField.propTypes = {
  listOptions: React.PropTypes.func.isRequired,

  filterOptions: React.PropTypes.array,
  userRole: React.PropTypes.string,
};

export default UserField;
