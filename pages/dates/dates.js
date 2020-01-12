// pages/index.js
var util = require('../../utils/util.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        year: new Date().getFullYear(), // 年份
        month: new Date().getMonth() + 1, // 月份
        day: new Date().getDate(),
        startDate: "1900-01",
        endDate: "2099-12",
        selects: {}, //已选择的日期
        styles: {
            i: 0,
            arr: [[], [], [], [], []],
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // let days_style = this.data.demo5_days_style;
        // for (let i = 1; i <= days_count; i++) {
        //     if (i < day) {
        //         days_style.push({ month: 'current', day: i, color: 'white', background: 'grey' });
        //     } else {
        //         break;
        //     }
        // }
        // this.setData({
        //     demo5_days_style
        // });
        var date = new Date();
        this.setData({
            startDate: date.getFullYear().toString() + "-" + util.formatNumber(date.getMonth()+1)
        });
        console.log(date.getFullYear().toString() + "-" + util.formatNumber(date.getMonth()+1))
        date.setMonth(date.getMonth() + this.data.styles.arr.length-1);
        this.setData({
            endDate: date.getFullYear().toString() + "-" + util.formatNumber(date.getMonth() + 1)
        });
        console.log(date.getFullYear().toString() + "-" + util.formatNumber(date.getMonth() + 1))
    },
    next: function (event) {
        let styles = this.data.styles;
        styles.i = styles.i + 1;
        this.setData({
            styles: styles
        });
    },
    prev: function (event) {
        let styles = this.data.styles;
        styles.i = styles.i - 1;
        this.setData({
            styles: styles
        });
    },
    dateChange: function (event) {
        console.log(event.detail);
    },
    dayClick: function (event) {
        var detail = event.detail;
        var key = detail.year + "年" + detail.month + "月"+detail.day+"日";
        if (this.data.selects[key] === undefined)
        {
            let styles = this.data.styles;
            let i = styles.i;
            let obj = {
                month: "current",
                day: detail.day,
                color: 'white',
                background: '#f5a8f0'
            };
            styles.arr[i].push(obj);
            this.setData({
                styles: styles
            });
            this.data.selects[key] = obj;
        }
        else
        {
            let val = this.data.selects[key];
            let styles = this.data.styles;
            let i = styles.i;
            util.arrayRemove(styles.arr[i], val);
            this.setData({
                styles: styles
            });
            this.data.selects[key] = undefined;
        }
    }, 
    bindtapOK: function(event) {
        let data = util.obj2Arr(this.data.selects);
        let eventChannel = this.getOpenerEventChannel();
        wx.navigateBack({
            delta: 1,
            success: function (res) {
                eventChannel.emit('okEvent', {data: data});
            }
        });
    }
})