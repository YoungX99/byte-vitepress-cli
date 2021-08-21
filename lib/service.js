const symbols = require("log-symbols");
const path = require("path");
const fse = require("fs-extra");

const defConfig = require("./config");

const cfgPath = path.resolve(__dirname, "../config.json");

async function setService(id, credentials) {
  const exists = await fse.pathExists(cfgPath); //检查是否存在json路径
  if (exists) {
    serviceAction(id, credentials);
  } else {
    await defConfig(); // 如果不存在，则首先初始化配置
    serviceAction(id, credentials);
  }
}

async function serviceAction(id, credentials) {
  try {
    const jsonConfig = await fse.readJson(cfgPath);
    jsonConfig.service_ID = id;         //修改配置项中的服务信息
    jsonConfig.credentials = credentials;

    await fse.writeJson(cfgPath, jsonConfig);
    console.log(symbols.success, "Set the serviceInfo successfully!");
  } catch (err) {
    console.log(symbols.error, err);
    process.exit();
  }
}

module.exports = setService;
