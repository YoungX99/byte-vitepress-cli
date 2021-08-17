const fse = require('fs-extra')
const path = require('path')

const jsonConfig = {
  "name": "vitepress-cli",
  "mirror": "https://zpfz.vercel.app/download/files/frontend/tpl/vitepress-cli/"
}

const configPath = path.resolve(__dirname,'../config.json') //配置生成地址：该全局包位于本机的地址

async function defConfig() {
  try {
    // 将json文件输入到config.json 中
    await fse.outputJson(configPath, jsonConfig)
  } catch (err) {
    console.error(err)
  }
}

module.exports = defConfig


