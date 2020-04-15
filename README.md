# qiangpiaojiang

这是一款基于Java开发的12306抢票小程序的前端小程序代码

后端代码传送门

`https://github.com/15207135348/Java12306`

#### 功能列表

*   [x]  车次查询
*   [x]  车次筛选
*   [x]  自动打码
*   [x]  自动登录
*   [x]  普通刷票
*   [x]  候补抢票
*   [x]  微信通知
*   [x]  邮件通知
*   [x]  用户订单管理
*   [x]  先抢票后付款
*   [ ]  预约抢票
*   [ ]  车次推荐
*   [ ]  坐席推荐
*   [ ]  时段推荐
*   [ ]  在线选座
*   [ ]  成功率预估
*   [ ]  先付款安心抢
*   [ ]  免12306账户密码抢票

#### 项目环境

*   [x]  微信开发者工具

#### 使用到的小程序插件

*   [x]  极点日历（在微信开发平台添加插件）

#### 项目使用说明

*   在微信开发平台上创建一个小程序，拿到小程序的AppID和AppSecret

*   申请订阅消息1（用于候补抢票结果的通知）
![image.png](https://upload-images.jianshu.io/upload_images/12652505-264590224120ec36.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


*   申请订阅消息2（用于普通抢票结果的通知）
![image.png](https://upload-images.jianshu.io/upload_images/12652505-1440b8b7506e2ee6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


*   在微信开发平台中设置请求接口（如果没有域名、SSL证书以及公网IP，可用[mousenat](https://www.mousenat.cn/index.html)的内网穿透来一站解决所有问题）
![image.png](https://upload-images.jianshu.io/upload_images/12652505-f58acc23524c2cda.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


*   启动后端服务器

    *   详见`https://github.com/15207135348/Java12306`

    *   使用微信开发者工具打开小程序

    #### 思路图

    ![image.png](https://upload-images.jianshu.io/upload_images/12652505-470cc9aa3711b785.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

    #### 项目申明

    *   本软件只供学习交流使用，请不要用作商业用途，交流群号

        *   群号：832236668

    *   进群看公告

    *   在群文件中获取12306接口文档

    *   关注公众号【大数据学堂】，点击原创合集->抢票小程序，观看视频教程
![image.png](https://upload-images.jianshu.io/upload_images/12652505-bd565cd6ec07bec5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
    *   使用【抢票酱小程序】体验最终效果
![image.png](https://upload-images.jianshu.io/upload_images/12652505-eb8d716baf47005f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)