#!/usr/bin/env node

const updateChk = require("../lib/update");
const setMirror = require("../lib/mirror");
const setService = require("../lib/service");
const initProject = require("../lib/init");
const program = require("commander");

// version
program.version(require("../package.json").version, "-v, --version");

// init a project
program
  .name("vitepress-cli")
  .usage("<commands> [options]")
  .command("init <project>")
  .option("-e,--en", "create an English template")
  .description("Create a VitePress project by language options.")
  .action((project, cmd) => {
    initProject(project, cmd);
  });

// upgrade the cli
program
  .command("upgrade")
  .description("Check the VitePress-CLI version.")
  .action(() => {
    updateChk();
  });

// reset the mirror
program
  .command("mirror <template_mirror>")
  .description("Set the template mirror.")
  .action(tplMirror => {
    setMirror(tplMirror);
  });

// set the serviceInfo
program
  .command("service <service_ID> <credentials>")
  .description("Set the serviceInfo.")
  .action((serviceID, credentials) => {
    setService(serviceID, credentials)
  });

program.on("--help", function () {
  console.log("");
  console.log("Examples:");
  console.log("  $ vitepress-cli init myproject");
  console.log("  $ vitepress-cli template");
  console.log("");
});

program.parse(process.argv);
