import diff from "./diff";

export default class Component {
  constructor(props) {
    this.props = props;
  }

  setState(state) {
    // 更新state对象里的数据，改变子类 state
    this.state = Object.assign({}, this.state, state);
    // 获取最新需要被渲染的 virtualDOM 对象
    let newVirtualDOM = this.render();
    // 获取旧的DOM对象上挂载的 virtualDOM 对象
    let oldVirtualDOM = this.getDom();
    // 获取渲染容器
    const container = oldVirtualDOM.parentNode;
    // 对有变化的Dome进行比对后渲染至页面
    diff(newVirtualDOM, container, oldVirtualDOM);
  }

  // 生命周期函数
  componentWillMount() {}; // 组件将要挂载时触发
  componentDidMount() {}; // 组件挂载完成时触发
  componentWillReceiveProps(nextProps) {}; // 父组件中改变了props传值时触发
  shouldComponentUpdate(nextProps, nextState) { // 是否要更新数据时触发
    return nextProps != this.props || nextState != this.state;
  };
  componentWillUpdate(nextProps, nextState) {}; // 将要更新数据时触发
  componentDidUpdate(prevProps, prevState) {}; // 数据更新完成时触发
  componentWillUnmount() {}; // 组件将要销毁时触发


  // 存储旧的 virtualDOM 对象
  setDom(dom) {
    this._oldDom = dom;
  }
  // 获取旧的 virtualDOM 对象
  getDom() {
    return this._oldDom;
  }
  // 更新props
  updataprops(props) {
    this.props = props;
  }
}