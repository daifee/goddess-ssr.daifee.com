
export default function() {
  return Object.prototype.toString.call(global.process) === '[object process]';
}
