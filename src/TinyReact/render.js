import diff from './diff';
// 将virtualDOM对象转换成真实DMO对象
  // container.firstChild 为真实 DOM 对象的 virtualDOM
export default function render (virtualDOM, container, oldDom = container.firstChild) {
  // 调用diff算法，对虚拟DOM和旧的实际DOM进行对比
  diff(virtualDOM, container, oldDom);
}