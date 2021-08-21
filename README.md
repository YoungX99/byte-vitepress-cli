# Introduction

`Due to some unknown error, please use limited version vitepress template temporarily.`

This is a lightweight CLI for VitePress，you can select the language template you want with the parameters.What is distinctive is that supports bytedance's InspireCloud page deployment.

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
### init <PROJECT_NAME> [LANGUAGE_OPTIONS]
Create the VitePress project:
```
$ byte-vitepress-cli init myproject 
or 
$ byte-vitepress-cli init myproject -e
```

### upgrade
Check the new version is available or not:
```
$ byte-vitepress-cli upgrade
```

### service <service_ID> \<credentials>
You can use this command to record your InspireCloud service configuration.

The service_ID can be viewed in your cloud service configuration item.

For the configuration of credentials, you can see the following url: [personal_ credentials](https://qingfuwu.cn/docs/openapi/personaltoken2.html)
```
$ byte-vitepress-cli service aaabbb abcdefxyz
```
### deploy
Deploy your project to InspireCloud.

Before deploying, make sure you use the Service Command to set up your service information.

In addition, you must run the `npm run build` command to build your project.
```
$ byte-vitepress-cli deploy
```

### mirror <TEMPLATE_MIRROR>
You can also set the template mirror like this:
```
$ byte-vitepress-cli mirror https://moonstarimg.oss-cn-hangzhou.aliyuncs.com/template/
```
**NOTE**  
You can customize the template mirror link by youself, but the template file name must be `template.zip` or `template-en.zip`, and the mirror link should be `/` ending.  
For example, the full link to your custom template mirror is `https://example.com/mirror/template.zip` or `https://example.com/mirror/template-en.zip`, the mirror link that vitepress-cli can recognize should be `https://example.com/mirror/`.  

You can download the VitePress template from [byte-vitepress-cli](https://github.com/YoungX99/byte-vitepress-cli). 


