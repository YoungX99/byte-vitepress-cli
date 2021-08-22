const symbols = require('log-symbols')
const path = require('path')
const fse = require('fs-extra')

const defConfig = require('./config')
const cfgPath = path.resolve(__dirname, '../config.json')

async function setMonitor(id) {
    const exists = await fse.pathExists(cfgPath) //检查是否存在json路径
    if (exists) {
        monitorAction(id)
    } else {
        await defConfig() // 如果不存在，则初始化下载配置
        monitorAction(id)
    }
}    


async function monitorAction(id) {
    try {
        const jsonConfig = await fse.readJson(cfgPath)
        jsonConfig.app_ID = id //将配置项中的app_id改为用户传入的id
        await fse.writeJson(cfgPath, jsonConfig)
        console.log(symbols.success, 'Set the Monitor successfully.')
    } catch (err) {
        console.log(symbols.error, err)
        process.exit()
    }
}

module.exports = setMonitor