/**
 * Created by tm on 2017/7/4.
 */
'use strict';

import BaseObject from './baseObject'

class Admin extends BaseObject{
    constructor(){
        super();
        this.login = this.login.bind(this)
    }
     async login(req, res, next) {
        res.send({
            status: 0,
            type: 'FORM_DATA_ERROR',
            message: '表单信息错误'
        })
    }
}

export default new Admin()