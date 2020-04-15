var config = require("../../config.js");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        people: [],
        checks: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //初始化页面数据
        const that = this;
        wx.showLoading({
            title: '加载中'
        })
        config.get(config.urls.GET_PEOPLE_URL, {}, function (res) {
            console.log("后台返回数据")
            console.log(res.data);
            wx.hideLoading()
            if (res.data.success) {
                let arr = JSON.parse(res.data.message);
                for(var i = 0; i < arr.length; ++i)
                {
                    //如果手机未核验
                    if (!arr[i].ifReceive)
                    {
                        arr[i].tip = "需核验乘车人手机号"
                    }
                    else
                    {
                        arr[i].tip = ""
                    }
                }
                that.setData({
                    people: arr
                })
            }
        });
    },

    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
        this.setData({
            checks: e.detail.value
        })
    },

    bindtapOK: function (e) {
        console.log('bindtapOK')
        console.log('选择乘客的序号' + this.data.checks)
        let checks = this.data.checks
        let people = this.data.people
        let selectedPeople = []
        for (var i = 0; i < checks.length; ++i) {
            let index = Number(checks[i])
            let selectedOne = people[index]
            selectedPeople.push(selectedOne.name)
        }
        console.log("选择的乘客:")
        console.log(selectedPeople)

        var flag = true;
        for(var i = 0; i < checks.length; ++i)
        {
            let index = Number(checks[i])
            if (!people[index].ifReceive)
            {
                flag = false;
                break;
            }
        }
        if(!flag)
        {
            wx.showModal({
                title: '手机号未核验',
                content: '请前往12306核验乘客的手机号',
                showCancel: false,
                success(res) {
                    console.log('用户点击确定')
                }
            })
            return
        }

        console.log("people页面跳回submit页面")
        let eventChannel = this.getOpenerEventChannel();
        wx.navigateBack({
            delta: 1,
            success: function (res) {
                console.log("携带参数")
                console.log(selectedPeople)
                eventChannel.emit('okEvent', {
                    data: selectedPeople
                });
            }
        });
    }
})