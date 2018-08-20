const commonConf = require('./common.json');
const prodConf = require('./prod.json');
const stageConf = require('./stage.json');

let confObj;

if (process.env.NODE_ENV === 'production') {
  confObj = Object.assign({}, commonConf, prodConf);
} else {
  confObj = Object.assign({}, stageConf, stageConf);
}

export default confObj;

export function lol() {
  return async () => {
    await 25;
  };
}
