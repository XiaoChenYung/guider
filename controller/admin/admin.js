/**
 * Created by tm on 2017/7/4.
 */
'use strict';

import BaseObject from './baseObject'
import crypto from 'crypto'
import formidable from 'formidable'
import dtime from 'time-formater'
import Guider from '../../models/guider'

class Admin extends BaseObject{
    constructor(){
        super();
        this.login = this.login.bind(this)
        this.singup = this.singup.bind(this)
    }
     async login(req, res, next) {
        res.send({
            status: 0,
            type: 'FORM_DATA_ERROR',
            message: '表单信息错误'
        })
    }
    async singup(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            console.log(fields);
            if (err) {
                res.send({
                    status: 0,
                    type: 'FORM_DATA_ERROR',
                    message: '表单信息错误'
                })
                return
            }
            const {user_name, password} = fields;
            try{
                if (!user_name) {
                    throw new Error('用户名错误')
                }else if(!password){
                    throw new Error('密码错误')
                }
            }catch(err){
                console.log(err.message, err);
                res.send({
                    status: 0,
                    type: 'GET_ERROR_PARAM',
                    message: err.message,
                })
                return
            }
            try{
                const guider = await Guider.findOne({user_name})
                if (guider) {
                    console.log('该用户已经存在');
                    res.send({
                        status: 0,
                        type: 'USER_HAS_EXIST',
                        message: '该用户已经存在',
                    })
                }else{
                    const guider_id = await this.getId('guider_id');
                    const newpassword = this.encryption(password);
                    const newGuider = {
                        user_name,
                        password: newpassword,
                        id: guider_id,
                        create_time: dtime().format('YYYY-MM-DD'),
                    }
                    await Guider.create(newGuider)
                    req.session.guider_id = guider_id;
                    res.send({
                        status: 1,
                        message: '注册成功',
                    })
                }
            }catch(err){
                console.log('注册失败', err);
                res.send({
                    status: 0,
                    type: 'REGISTER_ADMIN_FAILED',
                    message: '注册失败',
                })
            }
        })
    }

    encryption(password){
        const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
        return newpassword
    }
    Md5(password){
        const md5 = crypto.createHash('md5');
        return md5.update(password).digest('base64');
    }
}

export default new Admin()