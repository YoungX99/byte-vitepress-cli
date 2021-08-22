const symbols = require("log-symbols"); //符号打印
const fse = require("fs-extra"); //文件处理
const ora = require("ora"); //动画处理
const chalk = require("chalk"); //文字颜色处理
const AdmZip = require("adm-zip");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const initSpinner = ora(chalk.cyan("Deploying project...")); //打包动画生成

async function checkCfg(path) {
  const cfgExists = await fse.pathExists(path);
  if (!cfgExists) {
    initSpinner.stop(); //停止动画
    console.log(
      symbols.error,
      chalk.red(
        `Deploy the docs failed. Please make sure you have entered your service configuration information through the Service Command!`
      )
    );
    process.exit();
  }
  const jsonConfig = await fse.readJson(path);
  let { service_ID, credentials } = jsonConfig;

  if (!service_ID || !credentials) {
    initSpinner.stop(); //停止动画
    console.log(
      symbols.error,
      chalk.red(
        `Deploy the docs failed. Please make sure you have entered your service configuration information through the Service Command!`
      )
    );
    process.exit();
  }
}
async function fileProcess(cfgPath, filePath) {
  const exists = await fse.pathExists(filePath); //判断执行路径下，是否有打包
  if (!exists) {
    initSpinner.stop(); //停止动画
    console.log(
      symbols.error,
      chalk.red(
        `Deploy the docs failed. Please make sure you have built your documents. `
      )
    );
    process.exit();
  } else {
    const jsonConfig = await fse.readJson(cfgPath); //获取服务配置信息
    const { service_ID, credentials } = jsonConfig;
    const url = `https://open.qingfuwu.cn/v1/services/${service_ID}/hosting/versions`;
    const headersInfo = `Bearer ${credentials}`;
    const file = new AdmZip();
    file.addLocalFolder(filePath);
    const zipPath = path.resolve(filePath, "../dist.zip");
    file.writeZip(zipPath); //将打包文件压缩
    const localZip = fse.createReadStream(zipPath);
    const formData = new FormData();
    formData.append("file", localZip);

    try {
      const { data } = await axios({
        url,
        method: "POST",
        data: formData,
        headers: {
          ...formData.getHeaders(),
          Authorization: headersInfo,
        },
      });
      initSpinner.stop();
      console.log(
        symbols.success,
        chalk.cyan(
          `You have successfully deployed the project with version: ${chalk.greenBright(
            data.version
          )}`
        )
      );
      const getUrl = `https://open.qingfuwu.cn/v1/services/${service_ID}/hosting`;
      const res = await axios({
        url: getUrl,
        method: "get",
        headers: {
          Authorization: headersInfo,
        },
      });
      console.log(
        symbols.info,
        chalk.cyan(`network: ${chalk.blueBright(res.data.custom_hosting_url)}`)
      );
      process.exit();
    } catch (error) {
      console.log(error);
      process.exit();
    }
  }
}
async function deployProject() {
  try {
    const cfgPath = path.resolve(__dirname, "../config.json");
    await checkCfg(cfgPath); //检查配置文件以及服务配置内容是否存在
    initSpinner.start();
    const processPath = process.cwd(); //返回 Node.js 进程的当前工作目录
    const targetPath = `${processPath}/docs/.vitepress/dist`; //打包文件的路径
    fileProcess(cfgPath, targetPath); //文件处理
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

module.exports = deployProject;
