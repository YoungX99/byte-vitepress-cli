const download = require('download')
const ora = require('ora')
const chalk = require('chalk')
const path = require('path')
const fse = require('fs-extra')

const defConfig = require('./config') //导入模板配置项

const cfgPath = path.resolve(__dirname, '../config.json')


async function dlTemplate() {
    const exists = await fse.pathExists(cfgPath) //是否已存在配置文件？
    if (exists) {
        await dlAction()
    } else {
        await defConfig() //若无则先从config.js生成默认配置（第一次安装该包）
        await dlAction()
    }
}

async function dlAction() {
    const jsonConfig = await fse.readJson(cfgPath)
    const dlSpinner = ora(chalk.cyan('Downloading template...'))

    // 到镜像地址中下载模板，同时解压
    dlSpinner.start()
    try {
        await download(jsonConfig.mirror + 'template.zip', path.resolve(__dirname, '../template/'), { extract: true });
    } catch (err) {
        dlSpinner.text = chalk.red(`Download template failed. ${err}`)
        dlSpinner.fail()
        process.exit()
    }
    dlSpinner.text = 'Download template successful.'
    dlSpinner.succeed()
}

module.exports = dlTemplate