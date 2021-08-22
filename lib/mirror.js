const symbols = require('log-symbols')
const path = require('path')
const fse = require('fs-extra')

const defConfig = require('./config')

const cfgPath = path.resolve(__dirname, '../config.json')
const tplPath = path.resolve(__dirname, '../template/')

async function setMirror(link) {
    const exists = await fse.pathExists(cfgPath) //检查是否存在json路径
    if (exists) {
        mirrorAction(link)
    } else {
        await defConfig() // 如果不存在，则初始化下载配置
        mirrorAction(link)
    }
}    


async function mirrorAction(link) {
    try {
        const jsonConfig = await fse.readJson(cfgPath)
        jsonConfig.mirror = link //将配置项中的镜像地址改为用户传入的地址
        await fse.writeJson(cfgPath, jsonConfig)
        const exists = await fse.pathExists(tplPath)
        if (exists) {
            await fse.remove(tplPath)//更改镜像后，如果存在原有模板需将其删除
        }
        console.log(symbols.success, 'Set the mirror successfully.')
    } catch (err) {
        console.log(symbols.error, err)
        process.exit()
    }
}

module.exports = setMirror