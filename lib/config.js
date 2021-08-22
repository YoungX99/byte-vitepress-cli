const fse = require("fs-extra");
const path = require("path");

const jsonConfig = {
  name: "byte-vitepress-cli",
  mirror: "https://moonstarimg.oss-cn-hangzhou.aliyuncs.com/template/",
  service_ID: "",//填入你的云工程ID
  credentials: "",//填入你的个人凭证，用于headers请求
  app_ID:"",
};

const configPath = path.resolve(__dirname, "../config.json"); //配置生成地址：该全局包位于本机的地址

async function defConfig() {
  try {
    // 将json文件输入到config.json 中
    await fse.outputJson(configPath, jsonConfig);
  } catch (err) {
    console.error(err);
  }
}

module.exports = defConfig;
