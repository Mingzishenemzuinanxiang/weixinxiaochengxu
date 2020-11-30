// pages/booktype/index.js
const api = require('../../http/request')
import store from '../../store/index'
import create from '../../utils/create'

create.Page(store, {

    use: ['msg'],
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
        bookClass: [],
        bookLists: [],
        booknum: 0,
        class1: "all",
        booktype: {
            gender: "",
            type: "",
            major: "",
            minor: "",
            start: 1,
        },
    },
    update1(item) {
        this.data.booktype.type = item.detail.name
        this.getBookLists()
    },

    // update(){
    //     this.store.data.msg = "修改后的值"
    // },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.data.tap = options
        this.data.booktype.major = options.name
        this.data.booktype.gender = options.type
        this.setData({
            tap: this.data.tap
        })
        wx.setNavigationBarTitle({
            title: options.name,
        })
        let info = wx.getStorageSync('bookclass');
        let obj = info[this.data.tap.type]
        if (info && obj.length > 0) {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const element = obj[key];
                    if (element.major === this.data.tap.name) {
                        this.data.bookClass = element.mins
                        this.setData({
                            bookClass: this.data.bookClass
                        })
                    }
                }
            }
        } else {
            this.getClass()
        }
        this.getBookLists()
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
    onReachBottom: function(e) {
        this.data.booktype.start += 1
        this.getBookLists()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    qiehuan(e) {
        let info = e.currentTarget.dataset;
        let click = info === '' ? "全部" : info.id
        this.setData({ class1: click })
        this.data.booktype.minor = info.name
        this.data.booktype.start = 1
        this.data.booknum = 0
        this.data.bookLists = []
        this.getBookLists()
    },
    getClass() {
        api.default.getMinor().then(res => {
            wx.setStorageSync('bookclass', res)
            let obj = res[this.data.tap.type]
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const element = obj[key];
                    if (element.major === this.data.tap.name) {
                        this.data.bookClass = element.mins
                        this.setData({
                            bookClass: this.data.bookClass
                        })
                    }
                }
            }
        })
    },
    getBookLists() {
        api.default.getClassBook(this.data.booktype).then(res => {
            this.data.booknum = res.total;

            if (this.data.bookLists.length >= this.data.booknum) {
                wx.showToast({
                    title: '已经到底了',
                })
                return
            }

            res.books.map(item => {
                item.cover = `${this.store.data.imgurl}${item.cover}`
            })
            if (this.data.booktype.start !== 1) {
                res.books.map(item => {
                    this.data.bookLists.push(item)
                })
            } else {
                this.data.bookLists = res.books
            }
            this.setData({
                bookLists: this.data.bookLists
            })
        })
    },
    onclick(item) {
        let id = item.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/xiangqing/index?id=' + id,
        })
    }
})