import mountElement from "./mountElement";
import updataNodeElement from './updataNodeElement';

export default function createDomElement (virtualDOM) {
  // 渲染普通 virtualDOM 对象为真实DOM
  let newElement = null;
  if (virtualDOM.type == 'text') {
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type);
    // 为元素添加属性
    updataNodeElement(newElement, virtualDOM);
  }

  newElement._virtualDOM = virtualDOM; // 将 virtualDOM 备份

  // 递归创建子节点
  virtualDOM.children.forEach(child => {
    mountElement(child, newElement);
  });

  // 校验元素上是否有ref属性
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(newElement);
  }

  return newElement;
}