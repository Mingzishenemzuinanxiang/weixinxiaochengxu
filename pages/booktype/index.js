// pages/booktype/index.js
const api = require('../../http/request')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tab: [],
        clicltab: 'hot',
        typeList: [{
                id: 'hot',
                name: '热门'
            },
            {
                id: 'new',
                name: '新书'
            },
            {
                id: 'reputation',
                name: '好评'
            },
            {
                id: 'over',
                name: '完结'
            },
            {
                id: 'monthly',
                name: 'VIP'
            }
        ],
        tap: {},
        bookClass: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        this.data.tap = options
        this.setData({ tap: this.data.tap })
        wx.setNavigationBarTitle({
            title: options.name,
        })
        let info = wx.getStorageSync('bookclass');

        if (info[this.data.tap.type].length > 0) {
            // this.data.bookClass = info[this.data.tap.type]
            console.log(info[this.data.tap.type])
            this.setData({ bookClass: this.data.bookClass })
        } else {
            this.getClass()
        }

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }

    ,
    getClass() {
        api.default.getMinor().then(res => {
            console.log(res);
            wx.setStorageSync('bookclass', res)
                // this.data.bookClass = res[this.data.tap.type].mins
            this.setData({ bookClass: this.data.bookClass })

        })
    }
})