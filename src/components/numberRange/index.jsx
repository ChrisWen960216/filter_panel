/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import './NumberRange.css';

export default class NumberRange extends React.Component {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
    customConfig: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      startNum: this.props.value[0],
      endNum: this.props.value[1],
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleRangeNumber = this.handleRangeNumber.bind(this);
  }

  onInputChange(type, value) {
    if (!Number(value) && Number(value) !== 0) { return null; }
    return this.setState({ [type]: value },
      () => this.props.onChange(this.handleRangeNumber()));
  }

  handleRangeNumber() {
    const { startNum, endNum } = this.state;
    if (!startNum && !endNum) { return null; }
    return [startNum, endNum];
  }

  render() {
    const { startNum, endNum } = this.state;
    const { customConfig } = this.props;
    return (
      <div className="NumberRange">
        <Input style={{ width: '45%' }} value={startNum} onChange={e => this.onInputChange('startNum', e.target.value)} {...customConfig} />
        <span>~</span>
        <Input style={{ width: '45%' }} value={endNum} onChange={e => this.onInputChange('endNum', e.target.value)} {...customConfig} />
      </div>
    );
  }
}
NumberRange.defaultProps = {
  onChange: f => f,
  customConfig: {},
};
