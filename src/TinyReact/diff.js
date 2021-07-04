import mountElement from './mountElement';
import updataTextNode from './updataTextNode';
import updataNodeElement from './updataNodeElement';
import createDomElement from './createDomElement';
import unmountNode from './unmountNode';
import diffComponent from './diffComponent';
import mountComponent from './mountComponent';

export default function diff(virtualDOM, container, oldDom) {
  const oldVirtualDOM = oldDom && oldDom._virtualDOM;
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component;
  // 判断旧的Dom是否存在，不存在则直接渲染
  if (!oldDom) {
    // 渲染传入的元素，直接渲染
    mountElement(virtualDOM, container);
    // 判断当前 virtualDOM 类型是否相同，相同则证明需要改变内容
  } else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function') {
    // 节点类型不相同
    // 将新的 virtualDOM 渲染成新节点，并对旧节点进行替换
    const newElement = createDomElement(virtualDOM);
    oldDom.parentNode.replaceChild(newElement, oldDom);
  } else if (typeof virtualDOM.type === 'function') {
    // 渲染的是组件
    /*
    * virtualDOM 新组件的 virtualDOM 对象，可获取组件最新的 props 属性
    * oldComponent 要更新（旧）的组件实例对象，可调用组件的生命周期函数，可通过render方法获取 virtualDOM 对象
    * oldDom 旧的dom实例对象，挂载的有旧的 virtualDOM 对象
    * container 如果要更新的组件和旧组件不是同一个组件，要直接将组件的 virtualDOM 显示在页面中，此时需要 container 作为父容器
    */
    diffComponent(virtualDOM, oldComponent, oldDom, container);
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    // 节点类型相同
    // 更新 text 文本内容
    if (virtualDOM.type === 'text') {
      updataTextNode(virtualDOM, oldVirtualDOM, oldDom);
    } else {
      // 更新元素属性 
      updataNodeElement(oldDom, virtualDOM, oldVirtualDOM);
    }

    // 1. 将拥有key属性的子元素放在单独的对象中
    let keyedElements = {};
    for (let i = 0, len = oldDom.childNodes.length; i < len; i++) {
      let domElement = oldDom.childNodes[i];
      if (domElement.nodeType === 1) {
        let key = oldDom.getAttribute('key');
        if (key) {
          keyedElements[key] = domElement;
        }
      }
    }

    // 判断是否有key节点
    const hasNoKey = Object.keys(keyedElements).length === 0;

    if (hasNoKey) {
      // 递归对比子节点(通过索引)
      virtualDOM.children.forEach((child, i) => {
        diff(child, oldDom, oldDom.childNodes[i]);
      });
    } else {
      // 2. 循环virtualDOM 的子元素，获取子元素的 key 属性并校验
      virtualDOM.children.forEach((child, index) => {
        let key = child.props.key;
        if (key) {
          let domElement = keyedElements[key];
          if (domElement) {
            // 3. 对比当前元素是否是期望元素
            if (oldDom.childNodes[index] && oldDom.childNodes[index] !== domElement) {
              // 如果没有当前节点，则将新的节点插入当前对比的旧节点之前
              oldDom.insertBefore(domElement, oldDom.childNodes[index]);
            }
          } else {
            // 新增元素（新增元素，元素父级，插入新元素至哪一项之前）
            mountElement(child, oldDom, oldDom.childNodes[index]);
          }
        }
      });
    }

    // 节点的删除
    // 获取所有旧节点
    const oleChildNodes = oldDom.childNodes;
    // 获取新节点的数量
    const newChildNodes = virtualDOM.children.length;
    // 当旧节点的数量大于新节点时，则进行多余节点的删除操作
    if (oleChildNodes.length > newChildNodes) {
      // 判断通过索引还是key的方式删除节点
      if(hasNoKey) {
        for (let i = oleChildNodes.length - 1; i > newChildNodes - 1; i--) {
          unmountNode(oleChildNodes[i]);
        }
      } else {
        for(let i = 0;i < oleChildNodes.length; i++) {
          let oldChild = oleChildNodes[i]; // 旧节点
          let oldChildKey = oldChild._virtualDOM.props.key; // 旧节点的key属性
          let found = false; // 标识是否需要删除此节点
          for(let j = 0; j < newChildNodes;j++) {
            // 判断旧 virtualDom 的 key 是否可以在新的 virtualDom 里找到，可以找到则不需要删除旧节点，只需替换内容
            if (oldChildKey === virtualDOM.children[j].props.key) {
              found = true;
              break;
            }
            // 在新的 virtualDom 中找了一圈没找到，那就给旧的 virtualDom 节点干掉
            if(!found) {
              unmountNode(oldChild);
            }
          }
        }
      }
    }
  }
}