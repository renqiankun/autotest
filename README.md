#### electron vite vue3 bettter-sqlite3 typeorm 模板

##### 版本
      node：18.14.0
      python 3.7 存在全局命令
      visual studio 2022: 安装需选中c++桌面开发
      node-gyp：全局安装

###### 关键配置   
      npm config edit 
      添加配置msvs_version=2022 对应visual studio版本

###### 编译
      1. npm install 后会自动执行node-gyp rebuild
      2. npm rebuild
      3. 手动执行一次 electron-rebuild 编译sqlite模块
      win： .\node_modules\.bin\electron-rebuild.cmd 
      mac：.\node_modules\.bin\electron-rebuild（没试）




