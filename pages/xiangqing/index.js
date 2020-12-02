// pages/xiangqing/index.js
const api = require('../../http/request')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        data: null,
        id: null,
        bookInfo: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.data.id = options.id
        this.setData({ id: options.id })
        this.getData()

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

    },
    getData() {
        api.default.getbookInfo(this.data.id).then(res => {
            wx.setNavigationBarTitle({
                title: res.title,
            })
            res.cover = app.imageurl() + res.cover
            this.setData({ data: res })
            api.default.bookChapters(this.data.data._id).then(res => {
                console.log(res);
            })
            console.log(this.data.data);
        })


    },
    addshujia(e) {
        let id = e.currentTarget.dataset.id;
        console.log(id);
    }
})