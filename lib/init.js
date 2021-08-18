const symbols = require("log-symbols"); //符号打印
const fse = require("fs-extra"); //文件处理
const ora = require("ora"); //动画处理
const chalk = require("chalk"); //文字颜色处理
const path = require("path"); //路径处理

const dlTemplate = require("./download"); //模板下载
const updateChk = require("./update"); //检查更新

async function initProject(projectName, options) {
  try {
    //检查项目名称是否存在
    const exists = await fse.pathExists(projectName);
    if (exists) {
      console.log(symbols.error, chalk.red("The project already exists."));
    } else {
      //创建加载动画
      const initSpinner = ora(chalk.cyan("Initializing project..."));
      initSpinner.start();
      const processPath = process.cwd(); //返回 Node.js 进程的当前工作目录（用于当前文件夹下的模板生成）
      const LCProjectName = projectName.toLowerCase(); //转为小写
      const targetPath = `${processPath}/${LCProjectName}`; //生成的目标路径：执行命令时的目录下

      var templatePath = path.resolve(__dirname, "../template/"); //生成项目双语模板的绝对路径（用于该全局包地址下的模板存放）
      var mode = "template";
      if (options.e || options.en) {
        //下载双语模板
        templatePath = path.resolve(__dirname, "../template-en/");
        mode = "template-en";
      }

      const exists = await fse.pathExists(templatePath); //判断全局环境下是否存在普通模板
      if (!exists) {
        await dlTemplate(mode);
      }

      //如果存在模板
      try {
        await fse.copy(templatePath, targetPath); //将模板复制到目标路径下
      } catch (err) {
        console.log(symbols.error, chalk.red(`Copy template failed. ${err}`));
        process.exit();
      }

      //完成
      initSpinner.text = "Initialize project successful!";
      initSpinner.succeed();
      //打印提示语
      console.log(`
Before starting the project, please enter the following command:

	cd ${chalk.cyan(LCProjectName)}
	${chalk.cyan("npm install")} or ${chalk.cyan("yarn install")}
	${chalk.cyan("npm run dev")} or ${chalk.cyan("yarn run dev")}
					`);
      updateChk(); //检查是否有新版本
    }
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

module.exports = initProject;
