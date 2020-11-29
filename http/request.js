import { http } from './api'
import Url from './url';
export default {
    //分类
    getClass(datas) {
        return http({
            url: Url.classification.getCats,
            param: datas,
        })
    }

    ,
    getMinor(datas) {
        return http({
            url: Url.classification.getMinor,
            param: datas,
        })
    },
    //获取热门
    getbookhotWord(datas) {
        return http({
            url: Url.book.hotWord,
            param: datas,
        })
    }
    //关键词查询
    ,
    getKeyWord(datas, page) {
        console.log(datas);
        return http({
            url: Url.book.bookSearch(datas, page),
        })
    }, //文章详情
    getbookInfo(datas) {
        return http({
            url: Url.book.bookInfo(datas),
        })
    },
    //获取小分类书籍
    getClassBook(datas){
        return http({
            url: Url.classification.getCatsBooks(datas.gender,datas.type,datas.major,datas.minor,datas.start),
        })
    }
}