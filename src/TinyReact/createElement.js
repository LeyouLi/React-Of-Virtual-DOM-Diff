export default function createElement(type, props, ...children) {
   // 创建 virtual DOM 方法
  const childrenEles = [].concat(...children).reduce((result, child) => {
    if (child !== null && child !== true && child !== false) {
      if (child instanceof Object) {
        result.push(child);
      } else {
        result.push(createElement("text", {textContent: child}));
      }
    }
    return result;
  }, []);

  return {
    type,
    props: Object.assign({ children: childrenEles }, props),
    children: childrenEles,
  }
}