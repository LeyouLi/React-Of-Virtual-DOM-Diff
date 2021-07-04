export default function updataNodeElement(newElement, virtualDOM = {}, oldVirtualDOM = {}) {
  // 获取节点的对应属性对象
  const newProps = virtualDOM.props || {};
  const oldProps = oldVirtualDOM.props || {};

  Object.keys(newProps).forEach(propsName => {
    // 获取属性值
    const newPropsvalue = newProps[propsName];
    const oldPropsvalue = oldProps[propsName];

    // 判断新旧属性是否一致
    if (newPropsvalue !== oldPropsvalue) {
      // 判断是否是事件属性 onClick -> click
      if (propsName.slice(0, 2) === 'on') {
        // 处理需要绑定到元素上的事件名称
        const eventName = propsName.toLocaleLowerCase().slice(2);
        newElement.addEventListener(eventName, newPropsvalue);
        // 删除原有事件的事件处理函数
        if (oldPropsvalue) {
          newElement.removeEventListener(eventName, oldPropsvalue);
        }
      } else if (propsName === 'value' || propsName === 'cheched') {
        newElement[propsName] = newPropsvalue;
      } else if (propsName !== 'children') {
        // 判断是普通属性还是class属性
        const propsType = propsName === 'className' ? 'class' : propsName;
        newElement.setAttribute(propsType, newPropsvalue);
      }
    }
  });

  // 判断属性被删除情况
  Object.keys(oldProps).forEach(propsName => {
    const newPropsValue = newProps[propsName];
    const oldPropsValue = oldProps[propsName];

    // 属性是否被删除
    if (!newPropsValue) {
      // 判断是否是事件
      if (propsName.slice(0,2) === 'on') {
        const eventName = propsName.toLocaleLowerCase().slice(2);
        newElement.removeEventListener(eventName, oldPropsValue);
      } else if (propsName !== 'children') {
        // 删除普通属性（children除外）
        newPropsValue.removeAttribute(propsName);
      }
    }
  });
}