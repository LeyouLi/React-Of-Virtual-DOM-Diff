import mountNativeElement from "./mountNativeElement";
import mountComponent from "./mountComponent";
import isFunction from './isFunction';

export default function mountElement(virtualDOM, container, oldDom) {
  // 判断是组件还是普通的 virtualDOM 对象
  if (isFunction(virtualDOM)) {
    // 处理组件
    mountComponent(virtualDOM, container, oldDom);
  } else {
    // 处理普通的虚拟DOM对象
    mountNativeElement(virtualDOM, container, oldDom);
  }
}