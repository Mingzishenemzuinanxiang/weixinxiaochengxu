// pages/search/index.js
const api = require('../../http/request')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: null,
        howkey: [],
        searchKey: [],
        bookLists: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getApi();
        let info = wx.getStorageSync('seachKey')
        this.setData({ searchKey: info })

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
    // 随机颜色
    randomColor() {
        let r = Math.floor(Math.random() * 256)
        let g = Math.floor(Math.random() * 256)
        let b = Math.floor(Math.random() * 256)
        return `rgb(${r},${g},${b})`
    },
    //生成随机数组
    randnum() {
        let arr = []
        let color = []
        let length = Math.floor(Math.random() * (this.data.howkey.length))
        length = length === 0 ? 1 : length
        for (let index = 0; index < length; index++) {
            let info = this.data.howkey[Math.floor(Math.random() * (this.data.howkey.length))]
            if (arr.indexOf(info) !== -1 || info === undefined) {
                continue;
            }
            arr.push(info)
            color.push(this.randomColor())
        }
        this.setData({ arrlists: arr, beijing: color })

    },
    // 点击搜索
    onSearch(e) {
        let k = e.detail
        let form = wx.getStorageSync('seachKey')
        api.default.getKeyWord(k).then(res => {
            this.data.bookLists = res.books
            this.data.bookLists.map(item => {
                item.cover = app.imageurl() + item.cover
            })
            this.setData({ bookLists: this.data.bookLists })
            console.log(this.data.bookLists);
        })
        if (form) {
            if (form.indexOf(k) === -1 && k !== '') {
                form.push(k)
                wx.setStorageSync('seachKey', form)
                this.getStore()
            }
        } else {
            this.setData({ searchKey: [k] })
            wx.setStorageSync('seachKey', [k])
        }

    },
    //点击详情
    onclick(e) {
        let key = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/xiangqing/index?id=' + key,
        })
    },
    //点击切换热词
    switchall() {
        this.randnum()
    },
    // 请求接口
    getApi() {
        api.default.getbookhotWord().then(res => {
            this.data.howkey = res.newHotWords
            this.setData({ howkey: this.data.howkey })
            this.randnum()
        })
    },
    getStore() {
        this.setData({
            searchKey: wx.getStorageSync('seachKey')
        })
    },
    delseach() {
        wx.showModal({
            title: '删除',
            content: '确定删除搜索记录吗',
            success: (res) => {
                if (res.confirm) {
                    this.setData({ searchKey: [] })
                    wx.removeStorage({
                        key: 'seachKey',
                    })
                }
            }
        })

    }
})