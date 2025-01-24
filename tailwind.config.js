module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        '200px': '200px',  // 添加一个自定义的高度类
        '500px': '500px',  // 添加一个自定义的高度类
      },
      colors:{
        graybackground: '#f8f8f8',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
