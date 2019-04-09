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
    sm: { span: 19, push: 1 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { push: 3 },
    sm: { push: 5 },
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

    this.renderInput = this.renderInput.bind(this);

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
    const { formType } = formConfigItem;
    switch (formType) {
      case 'input':
      default:
        return this.renderInput(formConfigItem);
    }
  }

  renderInput(inputConfig) {
    const { form: { getFieldDecorator } } = this.props;
    const { property: { valueType, label, defaultValue = '', rules } } = inputConfig;
    const inputEle = getFieldDecorator(valueType, { initialValue: defaultValue, rules })(<Input />);
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
    { formType: 'input', property: { valueType: 'accountNo', defaultValue: '123', rules: [{ required: true }], label: '账号', customConfig: { placeholder: '请输入账号' } } },
    { formType: 'input', property: { valueType: 'accountNo2', label: '账号', customConfig: { placeholder: '请输入账号' } } },
    { formType: 'input', property: { valueType: 'accountNo3', label: '账号', customConfig: { placeholder: '请输入账号' } } },
    { formType: 'input', property: { valueType: 'accountNo4', label: '账号', customConfig: { placeholder: '请输入账号' } } },
    { formType: 'input', property: { valueType: 'accountNo5', label: '账号', customConfig: { placeholder: '请输入账号' } } },
  ],
};
