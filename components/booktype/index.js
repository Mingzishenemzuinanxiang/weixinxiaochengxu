// components/booktype/index.js
import imgurl from '../../http/url'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
        },
        lists: {
            type: Array,
        },
        type: {
            type: String
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        imageurl: imgurl.STATIC_HOST
    },

    /**
     * 组件的方法列表
     */
    methods: {
        clickA(e) {
            let { name, type ,sex} = e.currentTarget.dataset;
            wx.showLoading({
                title: '加载中。。。',
            })
            wx.navigateTo({
                url: `/pages/booktype/index?name=${name}&&type=${type}&&xing=${sex}`
            })
        },
    }
})