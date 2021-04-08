/*公共方法*/ 

const publicMethods = {
  /**
   * 顶部消息提示
   */
  showMessage: function (options) {
    options.visible = true; //默认显示
    return this.$store.commit('public/SHOW_MESSAGE', options);
  },

}

export default {
  publicMethods
}
