export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      'ms-medium': 'Medium ,sans-serif',
      'ms-bold': 'Bold, sans-serif',
    },
    colors: {
      textColor: '#222',
      gray: '#BFBFBF',
      gray2: '#808080',
      header: 'linear-gradient(270deg, #1085D2 0%, #00007B 100%)',
      white: '#fff',
      black: '#000',
      teal: '#008080',
    },
    boxShadow: {
      normal:
        '1px 1px 0px 0px #DBDBDB inset, -1px -1px 0px 0px #808080 inset, 1px 1px 0px 0px #FFF inset, -1px -1px 0px 0px #000 inset',
      hover:
        'inset -1px 0 gray, inset -1px 1px #fff, inset -1px -1px gray, inset 0 0 0 1px #fff',
      clicked:
        '1px 1px 0px 0px #DBDBDB inset, -1px -1px 0px 0px #808080 inset, 1px 1px 0px 0px #FFF inset, -1px -1px 0px 0px #000 inset',
      active:
        'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey',
      input:
        '1px 1px 0px 0px #808080 inset, -1px -1px 0px 0px #DFDFDF inset, 1px 1px 0px 0px #0A0A0A inset, -1px -1px 0px 0px #FFF inset',
      checkbox:
        '1px 1px 0px 0px #000 inset, -1px -1px 0px 0px #c0c0c0 inset, 1px 1px 0px 0px #808080 inset, -1px -1px 0px 0px #FFF inset',
      taskbar:
        'inset -1px 0 gray, inset -1px 1px #fff, inset -1px -1px gray, inset 0 0 0 1px #fff',
      inside:
        '-1px -1px 0px 0px #DFDFDF inset, 1px 1px 0px 0px #808080 inset, -1px -1px 0px 0px #FFF inset, 1px 1px 0px 0px #0A0A0A inset',
    },
  },
  plugins: [],
};
