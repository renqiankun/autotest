# electron-vite

electron + vite + better-sqlite3 + drizzle-orm

    1、orm使用更现代轻量的drizzle
    2、业务使用使用vue3，可自行替换
    3、nodev20.18.0 , electron v34.0.0
## 环境配置
    1、node使用v20.18.0
    2、visual studio2022 (安装 桌面端开发c++)
    3、python 3.7
    4、环境配置 npm config edit
        msvs_version=2022
        python=python3.7
    5、 全局安装node-gyp: npm i node-gpy -g    
## 项目启动
    1、npm install
    2、win 执行
       .\node_modules\.bin\electron-rebuild -f -w
       mac 执行
       ./node_modules/.bin/electron-rebuild -f -w

    3   执行 npm run rebuild
    4、 启动 npm run dev
    5、 打包 npm run build
    
### 待办
    数据库通信示例
    多窗口示例