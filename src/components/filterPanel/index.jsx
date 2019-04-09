import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import NumberRange from '../numberRange';
import 'moment/locale/zh-cn';
import './FilterPanel.css';

moment.locale('zh-cn');

const { RangePicker, MonthPicker, WeekPicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 21, push: 3 },
    sm: { span: 6, push: 0 },
  },
  wrapperCol: {
    xs: { span: 21, push: 3 },
    sm: { span: 15, push: 1 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { push: 3 },
    sm: { push: 7 },
  },
};

class FilterPanel extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    searchText: PropTypes.string,
    resetText: PropTypes.string,
    formConfigList: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.handleFormConfigList = this.handleFormConfigList.bind(this);
    this.handleFormConfigItem = this.handleFormConfigItem.bind(this);

    this.renderSingleInput = this.renderSingleInput.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { form: { validateFields } } = this.props;
    validateFields((err, values) => {
      if (!err) { console.log(values); }
    });
  }

  onReset() {
    const { form: { resetFields } } = this.props;
    return resetFields();
  }

  handleFormConfigList() {
    const { formConfigList } = this.props;
    const formList = formConfigList.map(formConfigItem => this.handleFormConfigItem(formConfigItem));
    return formList;
  }

  handleFormConfigItem(formConfigItem) {
    switch (formConfigItem.formType) {
      case 'date':
        return this.renderSingleInput(formConfigItem, <DatePicker style={{ width: '100%' }} />);
      case 'month':
        return this.renderSingleInput(formConfigItem, <MonthPicker style={{ width: '100%' }} />);
      case 'week':
        return this.renderSingleInput(formConfigItem, <WeekPicker style={{ width: '100%' }} />);
      case 'dateRange':
        return this.renderSingleInput(formConfigItem, <RangePicker style={{ width: '100%' }} />);
      case 'number':
        return this.renderSingleInput(formConfigItem, <InputNumber style={{ width: '100%' }} />);
      case 'numberRange':
        return this.renderSingleInput(formConfigItem, <NumberRange />);
      case 'input':
        return this.renderSingleInput(formConfigItem, <Input />);
      default:
        return null;
    }
  }

  renderSingleInput(config, ele) {
    const { form: { getFieldDecorator } } = this.props;
    const { property: { valueType, label, defaultValue, rules } } = config;
    const inputEle = getFieldDecorator(valueType, { initialValue: defaultValue, rules })(ele);
    const inputForm = (<Form.Item label={label} key={valueType}>{inputEle}</Form.Item>);
    return inputForm;
  }

  render() {
    const { searchText, resetText } = this.props;
    const formItemList = this.handleFormConfigList();
    return (
      <Form onSubmit={this.onSubmit} className="filterPanel" {...formItemLayout}>
        {formItemList}
        <Form.Item {...tailFormItemLayout}>
          <Button type="default" onClick={this.onReset}>{resetText}</Button>
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
  formConfigList: [
    { formType: 'input', property: { valueType: 'accountNo', label: '账号' } },
    { formType: 'date', property: { valueType: 'date', label: '日期', rules: [{ required: true }] } },
    { formType: 'number', property: { valueType: 'number', label: '数字' } },
    { formType: 'dateRange', property: { valueType: 'dateRange', label: '日期范围' } },
    { formType: 'week', property: { valueType: 'week', label: '星期' } },
    { formType: 'month', property: { valueType: 'month', label: '月份' } },
    { formType: 'numberRange', property: { valueType: 'numberRange', label: '数字范围', defaultValue: [100, 200], rules: [{ required: true }] } },
  ],
};
