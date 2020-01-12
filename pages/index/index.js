//index.js
//获取应用实例
var util = require('../../utils/util.js');
const app = getApp()
Page({
    data: {
        from_station: "",
        to_station: "",
        dates: "",
        trains: "",
        seats: ""
    },
    onLoad: function (options) {
        let from_station = wx.getStorageSync('from_station')
        let to_station = wx.getStorageSync('to_station')
        let dates = wx.getStorageSync('dates')
        this.setData({
            from_station: from_station,
            to_station: to_station,
            dates: dates

        })
    },
    bindtapFromStation: function (e) {
        console.log("bindtapFromStation");
    },
    bindinputFromStation: function (e) {
        this.setData({
            from_station: e.detail.value
        });
        console.log(e.detail.value)
        wx.setStorageSync('from_station', e.detail.value)
    },
    bindtapToStation: function (e) {
        console.log("bindtapToStation");
    },
    bindinputToStation: function (e) {
        this.setData({
            to_station: e.detail.value
        });
        console.log(e.detail.value)
        wx.setStorageSync('to_station', e.detail.value)
    },
    bindtapSwitch: function (e) {
        console.log("bindtapSwitch")
        let temp = this.data.from_station
        this.setData({
            from_station: this.data.to_station,
            to_station: temp
        });
        this.setData({
            trains: "",
            seats: ""
        });
        wx.setStorageSync('from_station', this.data.from_station)
        wx.setStorageSync('to_station', this.data.to_station)
    },
    bindtapDates: function (e) {
        let that = this;
        wx.navigateTo({
            url: '../dates/dates',
            events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                okEvent: function (res) {
                    let str = util.arrJoin(res.data, "/");
                    console.log(str);
                    that.setData({
                        dates: str,
                    });
                    wx.setStorageSync('dates', str)
                }
            }
        })
    },
    bindtapTrains: function (e) {
        console.log("在index的bindtapTrains函数中")
        if (this.data.from_station == "") {
            wx.showModal({
                title: '请先选择起始站',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }
        if (this.data.to_station == "") {
            wx.showModal({
                title: '请先选择终点站',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }
        if (this.data.dates == "") {
            wx.showModal({
                title: '请先选择时间',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }
        let that = this;
        wx.navigateTo({
            url: '../trains/trains',
            events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                okEvent: function (res) {
                    console.log("trains页面跳回index页面，返回结果")
                    console.log(res);
                    let str = util.arrJoin(res.data, "/");
                    that.setData({
                        trains: str,
                    });
                }
            },
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                let data = {
                    from_station: that.data.from_station,
                    to_station: that.data.to_station,
                    dates: that.data.dates
                }
                res.eventChannel.emit('data', data);
                console.log("index页面跳转trains页面，传递参数")
                console.log(data)
            }
        })
    },
    bindtapSeats: function (e) {
        console.log("bindtapSeats");
        if (this.data.from_station == "") {
            wx.showModal({
                title: '请先选择起始站',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }
        if (this.data.to_station == "") {
            wx.showModal({
                title: '请先选择终点站',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }
        if (this.data.dates == "") {
            wx.showModal({
                title: '请先选择时间',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }
        if (this.data.trains == "") {
            wx.showModal({
                title: '请先选择车次',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }
        let that = this;
        wx.navigateTo({
            url: '../seats/seats',
            events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                okEvent: function (res) {
                    console.log(res);
                    let str = util.arrJoin(res.data, "/");
                    that.setData({
                        seats: str,
                    });
                }
            },
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                let data = {
                    trains: that.data.trains,
                }
                res.eventChannel.emit('data', data);
                console.log("index页面跳转seats页面，传递参数")
                console.log(data)
            }
        })
    },

    bindtapNext: function (e) {

        var data = this.data;

        if (data.from_station == "") {
            wx.showModal({
                title: '请先选择起始站',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }
        if (data.to_station == "") {
            wx.showModal({
                title: '请先选择终点站',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }
        if (data.dates == "") {
            wx.showModal({
                title: '请先选择时间',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }
        if (data.trains == "") {
            wx.showModal({
                title: '请先选择车次',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }
        if (data.seats == "") {
            wx.showModal({
                title: '请先选择坐席',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }

        wx.setStorageSync('from_station', this.data.from_station)
        wx.setStorageSync('to_station', this.data.to_station)
        wx.setStorageSync('dates', this.data.dates)

        wx.navigateTo({
            url: '../submit/submit',
            events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                okEvent: function (res) {
                    console.log(res);
                }
            },
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('data', data);
            }
        })
    }
})