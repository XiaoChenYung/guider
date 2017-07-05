/**
 * Created by tm on 2017/7/4.
 */
'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const guiderSchema = new Schema({
    user_name: String,
    password: String,
    id: Number,
    create_time: String,
    avatar: {type: String, default: 'default.jpg'},
})

guiderSchema.index({id: 1});

const Guider = mongoose.model('guider', guiderSchema);


export default Guider