import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input } from 'antd';
import './FilterPanel.css';

const formItemLayout = {
  labelCol: {
    xs: { span: 21, push: 3 },
    sm: { span: 4, push: 0 },
  },
  wrapperCol: {
    xs: { span: 21, push: 3 },
    sm: { span: 20, push: 0 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { push: 3 },
    sm: { push: 4 },
  },
};

class FilterPanel extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    searchText: PropTypes.string,
    resetText: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.props);
  }

  render() {
    const { form, searchText, resetText } = this.props;
    console.log(form);
    return (
      <Form onSubmit={this.onSubmit} className="filterPanel" {...formItemLayout}>
        <Form.Item label="123:">
          <Input />
        </Form.Item>
        <Form.Item label="123:">
          <Input />
        </Form.Item>
        <Form.Item label="123:">
          <Input />
        </Form.Item>
        <Form.Item label="123:">
          <Input />
        </Form.Item>
        <Form.Item label="123:">
          <Input />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="default">{resetText}</Button>
          <Button type="primary" htmlType="submit" className="confirm_btn">{searchText}</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(FilterPanel);

FilterPanel.defaultProps = {
  searchText: '搜索',
  resetText: '重置',
};
