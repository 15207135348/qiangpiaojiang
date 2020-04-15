// pages/rushType/rushType.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        rushTypes:["实时抢票", "候补抢票"],
        checks: []
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //初始化页面数据
        console.log("rushType onLoad")
    },

    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
        this.setData({
            checks: e.detail.value
        })
    },

    bindtapOK: function (e) {
        console.log('bindtapOK')
        console.log('选择但抢票方式' + this.data.checks)
        let checks = this.data.checks
        let rushTypes = this.data.rushTypes
        let selectedRushTypes = []
        for (var i = 0; i < checks.length; ++i) {
            let index = Number(checks[i])
            selectedRushTypes.push(rushTypes[index])
        }
        console.log("选择的抢票方式:")
        console.log(selectedRushTypes)
        console.log("rushType页面跳回submit页面")
        let eventChannel = this.getOpenerEventChannel();
        wx.navigateBack({
            delta: 1,
            success: function (res) {
                console.log("携带参数")
                console.log(selectedRushTypes)
                eventChannel.emit('okEvent', {
                    data: selectedRushTypes
                });
            }
        });
    }
})