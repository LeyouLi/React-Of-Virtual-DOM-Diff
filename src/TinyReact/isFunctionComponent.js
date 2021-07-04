import isFunction from './isFunction';

export default function isFunctionComponent (virtualDOM) {
  // 校验组件是否是函数组件
  const type = virtualDOM.type;
  return type && isFunction(virtualDOM) && !(type.prototype && type.prototype.render);
} 