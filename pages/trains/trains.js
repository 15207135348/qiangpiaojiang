var config = require("../../config.js");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        from_station: "",
        to_station: "",
        dates: "",
        // {
        //     train: "G2047",
        //     from_station: "上饶",
        //     to_station: "武汉",
        //     start_time: "10:35",
        //     end_time: "15:03",
        //     duration: "04时28分",
        //     prices: "¥217.5",
        //     checked: false
        // }
        trains: [],
        checks: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //初始化页面数据
        const that = this;
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.on('data', function (data) {
            console.log("trains页面收到了index页面的参数")
            console.log(data)
            that.setData({
                from_station: data.from_station,
                to_station: data.to_station,
                dates: data.dates
            });
            console.log("trains设置参数成功")
        });
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

        console.log("trains页面的onShow函数")
        wx.showLoading({
          title: '加载中',
        })
        let data = {
            from_station: this.data.from_station,
            to_station: this.data.to_station,
            dates: this.data.dates
        }
        let that = this;
        console.log("向后台发送请求,url="+config.urls.GET_TRAINS_URL)
        console.log("携带参数")
        console.log(data)
        config.get(config.urls.GET_TRAINS_URL, data, function(res){
            console.log("后台返回数据")
            console.log(res.data);
            wx.hideLoading()
            if(res.data.success){
                let arr = JSON.parse(res.data.message);
                for(var i = 0; i < arr.length; i++) {
                    arr[i]["prices"] = "¥0.00"
                }
                that.setData({
                    trains: arr
                })
            }
        });
    },

    checkboxChange: function(e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
        this.setData({
            checks: e.detail.value
        })
    },

    bindtapOK: function(e) {
        console.log('bindtapOK')
        console.log('选择的车次的序号' + this.data.checks)
        let checks = this.data.checks
        let trains = this.data.trains
        let selected_trains = []
        for(var i = 0; i < checks.length; ++i)
        {
            let index = Number(checks[i])
            let selected_train = trains[index]
            selected_trains.push(selected_train.train)
        }
        console.log("选择的车次:")
        console.log(selected_trains)

        console.log("trains页面跳回index页面")
        let eventChannel = this.getOpenerEventChannel();
        wx.navigateBack({
            delta: 1,
            success: function (res) {
                console.log("携带参数")
                console.log(selected_trains)
                eventChannel.emit('okEvent', {data: selected_trains});
            }
        });
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

    }
})