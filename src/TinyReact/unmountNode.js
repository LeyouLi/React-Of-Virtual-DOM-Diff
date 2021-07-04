export default function unmountNode(node) {
  // 获取当前节点的 virtualDOM 对象
  const virtualDOM = node._virtualDOM;
  // 1. 如果是文本节点，则直接删除
  if (virtualDOM.type === 'text') {
    node.remove();
    return;
  }

  // 2. 节点是否是组件生成的
  let component = virtualDOM.component;
    // 存在组件的实例对象则说明此节点是由组件生成的
  if (component) {
    component.componentWillUnmount();
  }

  // 3. 节点上是否有ref属性
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(null);
  }

  // 4. 节点属性中是否有事件属性
  Object.keys(virtualDOM.props).forEach(propsName => {
    if (propsName.slice(0, 2) === 'on') {
      let eventName = propsName.toLocaleLowerCase().slice(0, 2);
      let eventHandler = virtualDOM.props[propsName];
      node.removeEventListener(eventName, eventHandler);
    }
  });

  // 5. 递归删除子节点（当前节点有子节点的情况）
  if (node.childNodes.length) {
    for (let i = 0; i < node.childNodes.length; i++) {
      unmountNode(node.childNodes[i]);
      i--;
    }
  }

  // 删除节点
  node.remove();
}