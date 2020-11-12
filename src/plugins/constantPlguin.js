import * as constants from '../constants'

export default {
  install: (app) => {
    Object.keys(constants).forEach(key => {
      app.config.globalProperties[`$${key}`] = constants[key];
    })
  },
};
