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
        startDate: "2000-01",
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

        var date1 = new Date();
        var date2 = new Date();
        date2.setMonth(date2.getMonth() + this.data.styles.arr.length-1);
        let styles = this.data.styles;
        let i = styles.i;
        for(var day = 1; day < date1.getDate(); ++day)
        {
            let obj = {
                month: "current",
                day: day,
                color: 'white'
            };
            styles.arr[i].push(obj);
        }
        this.setData({
            styles: styles,
            startDate: date1.getFullYear().toString() + "-" + util.formatNumber(date1.getMonth()+1),
            endDate: date2.getFullYear().toString() + "-" + util.formatNumber(date2.getMonth() + 1)
        });
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

    isSelectable: function(y, m, d){
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        console.log(y,m,d, year, month, day)
        if(y < year){
            return false
        }
        if(y > year){
            return true
        }
        if(m < month){
            return false
        }
        if(m > month){
            return true
        }
        return d >= day
    },

    dayClick: function (event) {
        var detail = event.detail
    
        if(!this.isSelectable(detail.year, detail.month, detail.day)){
            console.log("当前日期不可选")
            return
        }

        var key = detail.year + "年" + detail.month + "月"+detail.day+"日"
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