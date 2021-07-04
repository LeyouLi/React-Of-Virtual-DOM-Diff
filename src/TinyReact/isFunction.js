export default function ifFunction (virtualDOM) {
  return virtualDOM && (typeof virtualDOM.type === 'function');
}