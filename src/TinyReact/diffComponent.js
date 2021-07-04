import mountElement from './mountElement';
import updataComponent from './updataComponent';

export default function diffComponent (virtualDOM, oldComponent, oldDom, container) {
  if (isSameComponent(virtualDOM, oldComponent)) {
    console.log('是同一个组件');
    updataComponent(virtualDOM, oldComponent, oldDom, container);
  } else {
    console.log('不是同一个组件');
    // 第三个参数做组件删除
    mountElement(virtualDOM, container, oldDom);
  }
}

// 判断是否是同一个组件
function isSameComponent(virtualDOM, oldComponent) {
  // virtualDOM.type  更新后组件的构造函数
  // oldComponent 旧的组件实例对象上的 constructor 属性也指向组件的构造函数
  // 两者相等则表示为同一组件
  return oldComponent && virtualDOM.type === oldComponent.constructor;
}