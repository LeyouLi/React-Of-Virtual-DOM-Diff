import createDomElement from "./createDomElement";
import unmountNode from "./unmountNode";

export default function mountNativeElement(virtualDOM, container, oldDom) {
  // 解析渲染（当前渲染类组件的周期中的）virtualDOM 对象
  const newElement = createDomElement(virtualDOM);

  if (oldDom) {
    // 将新增元素插入到当前旧元素之前
    container.insertBefore(newElement, oldDom);
  } else {
    // 将转换之后的DOM对象挂载到页面上
    container.appendChild(newElement);
  }

  // 判断旧的DOM对象是否存在，存在则删除
  if (oldDom) {
    unmountNode(oldDom);
  }

  // 获取组件实例对象上的旧 virtualDOM 对象
  let component = virtualDOM.component;
  if (component) {
    // 调用组件实例对象的 setDom 方法存旧 virtualDOM 对象
    component.setDom(newElement);
  }
}