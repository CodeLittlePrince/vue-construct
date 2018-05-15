import * as types from './mutation-types'

/* 增加年龄 */
export const ageIncrease = function ({commit}) {
  setTimeout(() => {
    commit(types.AGE_INCREASE)
  }, 3000)
}