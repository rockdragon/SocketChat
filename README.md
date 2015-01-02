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

新建config.cfg，置于项目根目录
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
$ sudo npm install
$ sudo bower install
```
Node版本
=====
v0.11.14


