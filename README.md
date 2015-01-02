SocketChat
==========
基于socket.io的聊天室

环境变量设置
======
linux下:
    export chat_home=/xx/xxx/repo/SocketChat

windows下:
    set system environment variable `chat_home`
    d:\repo\SocketChat

配置文件，放置在项目根目录下，名为 config.cfg
======
```JSON
{
     "SECRET": "chat__socket",
     "www_port": 3000
}
```
源码下载后，请在项目目录下依次执行命令:
=====
npm install
bower install

Node版本
=====
v0.11.14


