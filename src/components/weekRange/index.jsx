/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import './WeekRange.css';

const { WeekPicker } = DatePicker;

/**
 *  Created By ChrisWen
 *  RangeWeek component provide week range select function.
 *
 *  @prop {[startWeek,endWeek]} value --- 开始,结束的星期
 *  @prop {moment} value.startWeek --- 开始的星期
 *  @prop {moment} value.endWeek --- 结束的星期
 *  @prop {({startWeek,endWeek}) => void} onChange --- 变化的回调
 */

export default class WeekRange extends React.Component {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
    customConfig: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      startWeek: this.props.value ? this.props.value[0] : '',
      endWeek: this.props.value ? this.props.value[1] : '',
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.handleRangeWeek = this.handleRangeWeek.bind(this);
    this.disabledStartDate = this.disabledStartDate.bind(this);
    this.disabledEndDate = this.disabledEndDate.bind(this);
  }


  onValueChange(type, value) {
    return this.setState(
      { [type]: value },
      () => this.props.onChange(this.handleRangeWeek()),
    );
  }

  handleRangeWeek() {
    const { startWeek, endWeek } = this.state;
    if (!startWeek && !endWeek) { return null; }
    return [startWeek, endWeek];
  }

  disabledStartDate(startWeek) {
    const { endWeek } = this.state;
    if (!endWeek) { return null; }
    return endWeek.valueOf() < startWeek.valueOf();
  }

  disabledEndDate(endWeek) {
    const { startWeek } = this.state;
    if (!startWeek) { return null; }
    return startWeek.valueOf() > endWeek.valueOf();
  }

  render() {
    const { startWeek, endWeek } = this.state;
    const { customConfig } = this.props;
    return (
      <div className="WeekRange">
        <WeekPicker
          style={{ width: '45%'}}
          value={startWeek}
          onChange={date => this.onValueChange('startWeek', date)}
          disabledDate={this.disabledStartDate}
          {...customConfig}
        />
        <span>~</span>
        <WeekPicker
          style={{ width: '45%'}}
          value={endWeek}
          onChange={date => this.onValueChange('endWeek', date)}
          disabledDate={this.disabledEndDate}
          {...customConfig}
        />
      </div>
    );
  }
}
WeekRange.defaultProps = {
  onChange: f => f,
  customConfig: {},
};
