var config = require("../../config.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: "",
        password: "",
        isPassword: true,
        eye_image_url: "../../image/icon_21.png",
        agree:true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    bindinputUsername: function(e){
        this.setData({
            username: e.detail.value
        });
        console.log(e.detail.value);
    },

    bindinputPassword: function(e){
        this.setData({
            password: e.detail.value
        });
        console.log(e.detail.value);
    },
    bindtapEye: function(e) {
        
        if(this.data.isPassword){
            this.setData({
                isPassword:false,
                eye_image_url:"../../image/icon_20.png"
            })
        }else{
            this.setData({
                isPassword:true,
                eye_image_url:"../../image/icon_21.png"
            })
        }
    },
    bindtapShowProtocol: function(e){
        wx.navigateTo({
          url: 'userprotocol',
        })
    },
    checkboxChange: function(e) {
        var agree = (e.detail.value.length == 1)
        console.log(agree)
        this.setData({
            agree: agree
        })
    },

    bindtapLogin: function(e){
        console.log(this.data.username);
        console.log(this.data.password);
        console.log(this.data.agree);

        if(this.data.username == ""){
            wx.showModal({
                content: '请输入12306账号',
                showCancel: false,
                success (res) {
                    console.log('用户点击确定')
                }
            })
            return;
        }

        if(this.data.password == ""){
            wx.showModal({
                content: '请输入12306密码',
                showCancel: false,
                success (res) {
                    console.log('用户点击确定')
                }
            })
            return;
        }

        if(!this.data.agree){
            wx.showModal({
                content: '请同意条款',
                showCancel: false,
                success (res) {
                    console.log('用户点击确定')
                }
            })
            return;
        }

        wx.showLoading({
            title: '登陆中'
        })

        config.get(config.urls.SET12306ACCOUNT_URL, {
            username: this.data.username,
            password: this.data.password
        },function (res) {
            wx.hideLoading()
            
            let data = res.data;
            if(data.success)
            {
                console.log(data.message);
                wx.showToast({
                    title: '绑定成功',
                    icon: 'success',
                    duration: 500
                  })
                wx.navigateBack({
                    delta: 1
                })
            }
            else
            {
                console.log(data.message);
                wx.showModal({
                    title: '登陆失败',
                    content: '请核对信息是否有误',
                    showCancel: false,
                    success (res) {
                        console.log('用户点击确定')
                    }
                })
            }
        })
    }

})