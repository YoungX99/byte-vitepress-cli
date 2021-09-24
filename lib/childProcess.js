const { spawn } = require("child_process");
/*是处理子进程相关的模块，其中的 spawn 方法即是生成子进程的方法。
  spawn 方法会接收三个主要参数，分别是要执行的文件名、执行参数和一个选项配置。
*/
async function npmProcess(...args) {
  const options = args[args.length - 1]; //取出选项配置
  if (process.platform === "win32") {
    //Windows系统需要手动添加配置，以此隐式地调用CMD
    options.shell = true;
  }
  return new Promise(resolve => {
    //创建子进程
    const proc = spawn(...args);
    //子进程合并入主进程
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    //执行时机
    proc.on("close", () => {
      resolve();
    });
  });
}

module.exports = npmProcess;
