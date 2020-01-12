var config = require("../../config.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: "",
        password: "",
        isPassword: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

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
    bindtapLogin: function(e){
        console.log(e);
        console.log(this.data.username);
        console.log(this.data.password);
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