Page({

    /**
     * 页面的初始数据
     */
    data: {
        seats: [],
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
            console.log("seats页面收到了index页面的参数")
            let totalSeats = data.totalSeats
            console.log(data)
            console.log(totalSeats)            
            let list = []
            for (var key in totalSeats) {
                list.push(key)
            }
            console.log(list)
            that.setData({
                seats: list
            })
        })
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

        // console.log("seats页面的onShow函数")
        // let trains = this.data.trains.split("/");
        // console.log(trains)
        // let map = {};
        // for (var i = 0; i < trains.length; ++i) {
        //     let seats = this.data.totalSeats[trains[i].substring(0, 1)];
        //     for (var j = 0; j < seats.length; ++j) {
        //         map[seats[j]] = true;
        //     }
        // }
        // let list = []
        // for (var key in map) {
        //     list.push(key)
        // }
        // console.log(list)
        // this.setData({
        //     seats: list
        // })
    },

    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
        this.setData({
            checks: e.detail.value
        })
    },

    bindtapOK: function(e) {
        console.log('bindtapOK')
        console.log('选择的座位的序号' + this.data.checks)
        let checks = this.data.checks
        let seats = this.data.seats
        let selectedSeats = []
        for(var i = 0; i < checks.length; ++i)
        {
            let index = Number(checks[i])
            let selectedSeat = seats[index]
            selectedSeats.push(selectedSeat)
        }
        console.log("选择的座位:")
        console.log(selectedSeats)

        console.log("seats页面跳回index页面")
        let eventChannel = this.getOpenerEventChannel();
        wx.navigateBack({
            delta: 1,
            success: function (res) {
                eventChannel.emit('okEvent', {data: selectedSeats});
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