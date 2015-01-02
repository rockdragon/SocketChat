SocketChat
==========
基于socket.io的聊天室

环境变量设置
======
linux下:
    ```shell
    export chat_home=/xx/xxx/repo/SocketChat
    ```

windows下:
    设置系统变量 `chat_home`
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
```shell
    npm install
    bower install
```
Node版本
=====
v0.11.14


