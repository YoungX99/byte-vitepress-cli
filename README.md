# Introduction

`Due to some unknown error, please use limited version vitepress template temporarily.`

This is a lightweight CLI for VitePress，and supports bilingual template selection.

# Installation
```
$ npm install byte-vitepress-cli -g
```
# Usage
Run the following command line to create the zh-CN project:
```
$ byte-vitepress-cli init myproject
```
Run the following command line to create the multilanguage support project:
```
$ byte-vitepress-cli init myproject -e
```

# Parameter
## init <PROJECT_NAME> [LANGUAGE_OPTIONS]
Create the VitePress project:
```
$ byte-vitepress-cli init myproject or byte-vitepress-cli init myproject -e
```

## upgrade
Check the new version is available or not:
```
$ byte-vitepress-cli upgrade
```

## mirror <TEMPLATE_MIRROR>
You can also set the template mirror like this:
```
$ byte-vitepress-cli mirror https://moonstarimg.oss-cn-hangzhou.aliyuncs.com/template/
```
**NOTE**  
You can customize the template mirror link by youself, but the template file name must be `template.zip` or `template-en.zip`, and the mirror link should be `/` ending.  
For example, the full link to your custom template mirror is `https://example.com/mirror/template.zip` or `https://example.com/mirror/template-en.zip`, the mirror link that vitepress-cli can recognize should be `https://example.com/mirror/`.  

You can download the VitePress template from [byte-vitepress-cli](https://github.com/YoungX99/byte-vitepress-cli). 


