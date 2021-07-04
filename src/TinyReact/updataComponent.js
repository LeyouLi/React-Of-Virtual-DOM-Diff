import diff from "./diff";

export default function updataComponent(virtualDOM, oldComponent, oldDom, container) {
  // 父组件中改变了props传值时触发
  oldComponent.componentWillReceiveProps(virtualDOM.props);

  // 判断是否需要更新
  if (oldComponent.shouldComponentUpdate(virtualDOM.props)) {
    let prevProps = oldComponent.props; // 未更新前的props
    oldComponent.componentWillUpdate(virtualDOM.props);
    // 更新组件的属性
    oldComponent.updataprops(virtualDOM.props);
    // 获取最新的 virtualDOM
    let nextVirtualDOM = oldComponent.render();
    // 更新挂载的组件实例对象
    nextVirtualDOM.component = oldComponent;
    // 调用 diff 进行组件对比更新渲染
    diff(nextVirtualDOM, container, oldDom);
    oldComponent.componentDidUpdate(prevProps);
  }

}