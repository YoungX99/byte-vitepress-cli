//侧边栏自动生成

const fs = require("fs");
const ph = require("path");
const prettier = require("prettier");

/**
 *
 * @param {*} path 文件路径
 * @param {*} en 是否为双语模式
 * @param {*} sort 是否按照约定排序
 * @returns
 */
function autoRouter(path = "./docs", en = false) {
  let autoSideBar = {};
  let baseRoot = [];
  readDirSync(path, autoSideBar, baseRoot);
  autoSideBar = sortArticle(autoSideBar);
  writeConfig(autoSideBar);
}

function readDirSync(path, sideBar, list) {
  //获取当前路径下所有的文件（夹）名
  var name = fs.readdirSync(path);
  name.forEach(element => {
    //得到该层级所读取的文件（夹）element的详细信息
    let baseDir = path + "/";
    let dirPath = baseDir + element;
    let info = fs.statSync(dirPath);

    //若为文件夹类型，且包含了md文件，设一个新数组记录并递归读取
    if (info.isDirectory() && checkMd(fs.readdirSync(dirPath))) {
      dirRoot = [];
      sideBar[`/${element}/`] = [{ children: dirRoot }];
      readDirSync(dirPath, sideBar, dirRoot);
    } else {
      //若为文件类型，只将md文件存入文件夹数组中
      if (element.includes(".md")) {
        list.push(prefixPath(path, element));
      }
    }
  });
}

function checkMd(item) {
  if (item instanceof Array) {
    for (let i of item) {
      if (i.includes(".md")) {
        return true;
      }
    }
  }
  return false;
}

function prefixPath(basePath, dirPath) {
  //核心函数：定制自己需要的格式
  let index = basePath.indexOf("/");
  let name = dirPath.replace(".md", "");
  // 去除一级目录地址
  basePath = basePath.slice(index, ph.length) + "/";
  // replace用于处理windows电脑的路径用\表示的问题
  return {
    text: name,
    link: ph.join(basePath, dirPath).replace(/\\/g, "/").replace(".md", ""),
  };
}

function sortArticle(sideBar) {
  for (sideBarItem in sideBar) {
    let child = sideBar[sideBarItem][0].children;
    //排序
    let sortList = [];
    let noSortList = [];
    child.forEach(item => {
      if (Number(item.link.match(/[^-]*$/))) {
        sortList.push(item.link);
      } else {
        noSortList.push(item.link);
      }
    });
    child = sortList
      .sort(function (a, b) {
        return a.match(/[^-]*$/) - b.match(/[^-]*$/);
      })
      .concat(noSortList);
    for (let i = 0; i < child.length; i++) {
      child[i] = {
        text: child[i].match(/([\u4e00-\u9fa5a-zA-Z]+)-/)[1],
        link: child[i].replace(".md", ""),
      };
    }
    sideBar[sideBarItem][0].children = child;
  }
  return sideBar;
}

function writeConfig(info) {
  let path = "./docs/.vitepress/config.js";
  fs.readFile(path, (err, file) => {
    if (err) throw err;
    let temp = file
      .toString()
      .replace(/(?<=sidebar:)[\s\S]*(?=last)/g, JSON.stringify(info) + ",");

    const config = prettier.format(temp, { parser: "babel" });

    fs.writeFile(path, config, err => {
      if (err) {
        console.log(err);
      } else {
        console.log("路由刷新成功");
      }
    });
  });
}

module.exports = autoRouter;
