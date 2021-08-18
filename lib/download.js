const download = require("download");
const ora = require("ora");
const chalk = require("chalk");
const path = require("path");
const fse = require("fs-extra");

const defConfig = require("./config"); //导入模板配置项

const cfgPath = path.resolve(__dirname, "../config.json");

async function dlTemplate(templateMode) {
  const exists = await fse.pathExists(cfgPath); //是否已存在配置文件？
  if (exists) {
    await dlAction(templateMode);
  } else {
    await defConfig(); //若无则先从config.js生成默认配置（第一次安装该包）
    await dlAction(templateMode);
  }
}

async function dlAction(templateMode) {
  const jsonConfig = await fse.readJson(cfgPath);
  const dlSpinner = ora(chalk.cyan(`Downloading template from ${jsonConfig.mirror}`));

  // 到镜像地址中下载模板，同时解压
  dlSpinner.start();
  try {
    //下载模板
    await download(
      jsonConfig.mirror + `${templateMode}.zip`,
      path.resolve(__dirname, `../${templateMode}/`),
      { extract: true }
    );
  } catch (err) {
    dlSpinner.text = chalk.red(`Download the template failed. ${err}`);
    dlSpinner.fail();
    process.exit();
  }
  dlSpinner.text = "Download the template successfully!";
  dlSpinner.succeed();
}

module.exports = dlTemplate;
