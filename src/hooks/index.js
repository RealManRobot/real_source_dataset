const r = import.meta.glob("./modules/*.js", {eager: true})
const hooks = Object.keys(r).reduce((prev, item) => ({ ...prev, ...r[item]}), {})
export default hooks