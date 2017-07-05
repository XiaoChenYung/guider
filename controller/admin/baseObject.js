/**
 * Created by tm on 2017/7/4.
 */
import Ids from '../../models/ids'
export default class BaseObject {
    constructor(){
        this.idList = ['guider_id'];
    }

    //获取id列表
    async getId(type){
        if (!this.idList.includes(type)) {
            console.log('id类型错误');
            throw new Error('id类型错误');
            return
        }
        try{
            console.log("id cha");
            const idData = await Ids.findOne();
            idData[type] ++ ;
            await idData.save();
            return idData[type]
        }catch(err){
            console.log('获取ID数据失败');
            throw new Error(err)
        }
    }
}