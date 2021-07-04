import isFunctionComponent from './isFunctionComponent';
import mountElement from './mountElement';

export default function mountComponent (virtualDOM, container, oldDom) {
  // 解析渲染组件,区分类组件还是函数组件
  let nextVirtualDOM = null;
  let component = null; // 类组件的实例对象
  if (isFunctionComponent(virtualDOM)) {
    console.log('此组件为函数组件');
    nextVirtualDOM = buildFunctionComponent(virtualDOM);
  } else {
    console.log('此组件为类组件');
    nextVirtualDOM = buildClassComponent(virtualDOM);
    component = nextVirtualDOM.component;
  }

  mountElement(nextVirtualDOM, container, oldDom);

  // 处理类组件实例对象上的ref
  if (component) {
    component.componentDidMount();
    if (component.props && component.props.ref) {
      component.props.ref(component);
    }
  }
}

// 解析函数组件
function buildFunctionComponent(virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {});
}

// 解析类组件
function buildClassComponent(virtualDOM) {
  // 获取组件实例对象
    //virtualDOM.props就是类组件中的属性值
  const component = new virtualDOM.type(virtualDOM.props || {}); // 相当于调用 constructor 并传入props属性
  // 调用实例类中的render方法，返回解析后的 virtualDOM  对象
  const nextVirtualDOM = component.render();

  // 将当前类组件的实例对象存储起来，用以在构造函数中取旧的 virtualDOM 对象
  nextVirtualDOM.component = component;

  return nextVirtualDOM;
}