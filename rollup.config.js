import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { uglify } from "rollup-plugin-uglify"

export default {
  input: './src/main.js',
  output: [
    {
      file: './dist/scroll.js',
      name: 'scroll',
      format: 'umd'
    }
  ],
  plugins: [
    resolve(), 
    babel({ exclude: 'node_modules/**' }),  // 只编译源代码 
  ]
}