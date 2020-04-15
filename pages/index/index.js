//index.js
//获取应用实例
var util = require('../../utils/util.js');
var config = require('../../config.js');
const app = getApp()
Page({
    data: {
        fromStation: "",
        toStation: "",
        dates: "",
        trains: "",
        seats: "",
        totalSeats:{}
    },
    onLoad: function (options) {
        let fromStation = wx.getStorageSync('fromStation')
        let toStation = wx.getStorageSync('toStation')
        let dates = wx.getStorageSync('dates')
        this.setData({
            fromStation: fromStation,
            toStation: toStation,
            dates: dates
        })
        //登陆一下
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                config.get(config.urls.LOGIN_WX_URL, {
                        code: res.code
                    },
                    function (res) {
                        console.log(res.data.message);
                    }
                )
            }
        })
    },

    bindtapFromStation: function (e) {
        console.log("bindtapFromStation");
        let that = this;
        wx.navigateTo({
            url: '../station/station',
            events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                okEvent: function (res) {
                    console.log(res);
                    that.setData({
                        fromStation: res.data,
                    });
                    wx.setStorageSync('fromStation', res.data)
                    console.log("station页面返回参数:" + res.data)
                }
            }
        })
    },

    bindtapToStation: function (e) {

        console.log("bindtapToStation");

        let that = this;
        wx.navigateTo({
            url: '../station/station',
            events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                okEvent: function (res) {
                    console.log(res);
                    that.setData({
                        toStation: res.data,
                    });
                    wx.setStorageSync('toStation', res.data)
                    console.log("station页面返回参数:" + res.data)
                }
            }
        })
    },
    bindtapSwitch: function (e) {
        console.log("bindtapSwitch")
        let temp = this.data.fromStation
        this.setData({
            fromStation: this.data.toStation,
            toStation: temp
        });
        this.setData({
            trains: "",
            seats: ""
        });
        wx.setStorageSync('fromStation', this.data.fromStation)
        wx.setStorageSync('toStation', this.data.toStation)
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
        if (this.data.fromStation == "") {
            wx.showModal({
                title: '请先选择起始站',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }
        if (this.data.toStation == "") {
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
                    let str = util.arrJoin(res.data.selectedTrains, "/");
                    let totalSeats = res.data.totalSeats;
                    that.setData({
                        trains: str,
                        totalSeats: totalSeats
                    });

                }
            },
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                let data = {
                    fromStation: that.data.fromStation,
                    toStation: that.data.toStation,
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
        if (this.data.fromStation == "") {
            wx.showModal({
                title: '请先选择起始站',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }
        if (this.data.toStation == "") {
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
                    totalSeats: that.data.totalSeats
                }
                res.eventChannel.emit('data', data);
                console.log("index页面跳转seats页面，传递参数")
                console.log(data)
            }
        })
    },

    bindtapNext: function (e) {

        var data = this.data;

        if (data.fromStation == "") {
            wx.showModal({
                title: '请先选择起始站',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }
        if (data.toStation == "") {
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

        wx.setStorageSync('fromStation', this.data.fromStation)
        wx.setStorageSync('toStation', this.data.toStation)
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