// components/ranking/index.js
import imgurl from '../../http/url'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        lists: {
            type: Array
        },
        title: {
            type: String
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        imageUrl: imgurl.STATIC_HOST
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})