const cheerio = require("cheerio");
const symbols = require("log-symbols"); //符号打印
const fse = require("fs-extra"); //文件处理
const ora = require("ora"); //动画处理
const chalk = require("chalk"); //文字颜色处理
const path = require("path");

const initSpinner = ora(
  chalk.cyan("The monitoring configuration is being generated...")
); //打包动画生成

async function checkCfg(path) {
  const cfgExists = await fse.pathExists(path);
  if (!cfgExists) {
    initSpinner.stop(); //停止动画
    console.log(
      symbols.error,
      chalk.red(
        `Configuration failed. Please make sure you have entered your monitor configuration information through the Monitor Command!`
      )
    );
    process.exit();
  }
  const jsonConfig = await fse.readJson(path);
  let { app_ID } = jsonConfig;

  if (!app_ID) {
    initSpinner.stop(); //停止动画
    console.log(
      symbols.error,
      chalk.red(
        `Configuration failed. Please make sure you have entered your monitor configuration information through the Monitor Command!`
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
        `Configuration failed. Please make sure you have built your documents. `
      )
    );
    process.exit();
  }
}
async function monitorProject() {
  try {
    const cfgPath = path.resolve(__dirname, "../config.json");
    await checkCfg(cfgPath); //检查配置文件以及服务配置内容是否存在
    initSpinner.start();
    const processPath = process.cwd(); //返回 Node.js 进程的当前工作目录
    const targetPath = `${processPath}/docs/.vitepress/dist`; //打包文件的路径
    fileProcess(cfgPath, targetPath); //判断打包文件是否存在

    const cfgHtmlPath = path.resolve(__dirname, "../config.html");
    const jsonConfig = await fse.readJson(cfgPath);
    const { app_ID } = jsonConfig;
    const cfgHtml = `
    <script src="https://cdn.vansin.top/jssdk-0.1.2.min.js"></script>
    <script>
      new Monitor({
        baseUrl: "https://qcgtsp.app.cloudendpoint.cn/api",
        testMode: true,
        consoleError: true,
        app_id: ${app_ID},
      });
    </script>`;

    fse.writeFileSync(cfgHtmlPath, cfgHtml);

    const htmlPath = `${targetPath}/index.html`;
    let HTML1 = cheerio.load(fse.readFileSync(htmlPath));
    let HTML2 = cheerio.load(fse.readFileSync(cfgHtmlPath));

    HTML1("head").append(HTML2.html());
    fse.writeFileSync(htmlPath, HTML1.html());

    initSpinner.stop();
    console.log(
      symbols.success,
      chalk.cyan("You have successfully configured your monitor!")
    );
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

module.exports = monitorProject;
