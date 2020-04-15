var config = require("../../config.js");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        fromStation: "",
        toStation: "",
        dates: "",
        trains_temp: [],
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
                fromStation: data.fromStation,
                toStation: data.toStation,
                dates: data.dates
            });
            console.log("trains设置参数成功，参数如下")
            console.log(that.data.fromStation)
            console.log(that.data.toStation)
            console.log(that.data.dates)

            wx.showLoading({
                title: '加载中'
            })
            console.log("向后台发送请求,url=" + config.urls.GET_TRAINS_URL)
            console.log("携带参数")
            console.log(data)
            config.get(config.urls.GET_TRAINS_URL, data, function (res) {
                console.log("后台返回数据")
                console.log(res.data);
                wx.hideLoading()
                if (res.data.success) {
                    let arr = JSON.parse(res.data.message);
                    for(var i = 0; i < arr.length; ++i)
                    {
                        var ticketList = [];
                        var m = arr[i].tickets
                        for(var k in m)
                        {
                            if(m[k] == "")
                            {
                                continue;
                            }
                            if(m[k] == "无" && arr[i].canBackup)
                            {
                                m[k] = "可候补"
                            }
                            if(m[k] == "无" && !arr[i].canBackup)
                            {
                                m[k] = "可抢票"
                            }
                            ticketList.push(k+":"+m[k])
                        }
                        arr[i].ticketList = ticketList;
                    }
                    that.setData({
                        trains: arr,
                        trains_temp: arr
                    })
                    console.log(arr);
                }
            });
        });
    },

    checkboxChange1: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
        //从早到晚高铁动车
        if (e.detail.value.length == 2) {
            var trains = this.data.trains_temp;
            var arr = [];
            for (var i = 0; i < trains.length; ++i) {
                if (trains[i].trainCode.indexOf("D") >= 0 ||
                    trains[i].trainCode.indexOf("G") >= 0 ||
                    trains[i].trainCode.indexOf("C") >= 0) {
                    arr.push(trains[i]);
                }
            }
            this.setData({
                trains: arr
            });
        } else if (e.detail.value.length == 1 && e.detail.value[0] == "time") {
            var arr = this.data.trains_temp;
            this.setData({
                trains: arr
            });
        } else if (e.detail.value.length == 1 && e.detail.value[0] == "type") {
            var trains = this.data.trains_temp;
            var arr = [];
            for (var i = trains.length - 1; i >= 0; --i) {
                if (trains[i].trainCode.indexOf("D") >= 0 ||
                    trains[i].trainCode.indexOf("G") >= 0 ||
                    trains[i].trainCode.indexOf("C") >= 0) {
                    arr.push(trains[i]);
                }
            }
            this.setData({
                trains: arr
            });
        } else if (e.detail.value.length == 0) {
            var trains = this.data.trains_temp;
            var arr = [];
            for (var i = trains.length - 1; i >= 0; --i) {
                arr.push(trains[i]);
            }
            this.setData({
                trains: arr
            });
        }
    },

    checkboxChange2: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
        this.setData({
            checks: e.detail.value
        })
    },

    bindtapOK: function (e) {
        console.log('bindtapOK')
        console.log('选择的车次的序号' + this.data.checks)
        let checks = this.data.checks
        let trains = this.data.trains
        let selectedTrains = []
        let totalSeats = {}
        for (var i = 0; i < checks.length; ++i) {
            let index = Number(checks[i])
            let selectedTrain = trains[index]
            selectedTrains.push(selectedTrain.trainCode)
            for (var k in selectedTrain.tickets) {
                if (selectedTrain.tickets[k] != "") {
                    totalSeats[k] = selectedTrain.tickets[k];
                }
            }
        }
        console.log("选择的车次:")
        console.log(selectedTrains)
        console.log("车次的坐席:")
        console.log(totalSeats)

        console.log("trains页面跳回index页面")
        let eventChannel = this.getOpenerEventChannel();
        wx.navigateBack({
            delta: 1,
            success: function (res) {
                console.log("携带参数")
                console.log(selectedTrains)
                eventChannel.emit('okEvent', {
                    data: {
                        selectedTrains: selectedTrains,
                        totalSeats: totalSeats
                    }
                });
            }
        });
    }
})