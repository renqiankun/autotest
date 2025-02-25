# electron-vite

electron + vite + better-sqlite3 + drizzle-orm

    1、orm使用更现代轻量的drizzle
    2、业务使用使用vue3，可自行替换
    3、nodev20.18.0 , electron v34.0.0

## 项目目录结构
    生成目录树结构
    ├── assets #静态资源 此处包含打包后app icon，暂时仅win
    ├── common render及main进程都可访问目录
    ├── electron 主进程目录
    │   ├── main
    │   │   ├── db  数据库目录
    │   │   ├── router  路由目录（抛出访问数据库的接口）
    │   │   ├── utils.ts
    │   │   ├── dbServicesInit.ts 抛出数据库初始化方法
    │   │   ├── index.ts  主进程入口
    │   └── preload 预加载目录
    ├── migrations 数据库升级目录
    ├── public  vue项目 目录
    ├── src vue项目目录
    ├── drizzle.config.ts  drizzle迁移配置
    ├── electron-builder.json  打包app配置
   
   


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
    2、npm rebuild
    // 将原生模块适配electron，可选指定模块 如better-sqlite3
    3、npx electron-rebuild -f -w [better-sqlite3]
    4、 启动 npm run dev
    5、 打包 npm run build

## 开发
    一、开发过程修改scheme后执行npm run syncSchema，进行本地数据库结构同步

    二、打包时
      1、执行 npm run generateSchama 生成数据库升级文件
      2、执行 npm run build 打包  

### 待办
    数据库通信示例
    多窗口示例




#
    数据库升级分开发环境 和生产环境，开发环境使用drizzle-kit push，生产环境使用migrate方式

    一、打包会自动生成数据库升级文件，无需额外处理，只需保证drizzle.config.ts中databasePath数据库路径正确指向本地数据库文件
    
    二、开发环境在修改数据库接口schme后执行npm run syncSchema即可
    npm run syncSchema 实际为三条命令，原因为 开发中将better-sqlite3编译electron中的node版本，而使用npx drizzle-kit push同步数据库时使用的本地node版本
    1 npm rebuild 目的将better-sqlite3编译为本地node原生模块
    2 npx drizzle-kit push 将shceme直接同步到本地数据库
    3 npx electron-rebuild  -f -w 编译原生模块此处指better-sqlite3适配electron中的node版本

    三、migrations目录为数据库升级过程文件，不可随意删除