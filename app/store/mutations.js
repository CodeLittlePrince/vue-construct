import * as types from './mutation-types'

const mutations = {
  /* 增加年龄 */
  [types.AGE_INCREASE](state) {
    state.age ++
  }
}

export default mutations