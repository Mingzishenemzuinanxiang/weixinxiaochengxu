import {http} from './api'
import Url from './url';
export default{
  //分类
  getClass(datas){
    return http({
        url:Url.classification.getCats,
        param:datas,
    })
  }
}