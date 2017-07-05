'use strict';

import mongoose from 'mongoose'

const idsSchema = new mongoose.Schema({
	guider_id: Number,
});

const Ids = mongoose.model('Ids', idsSchema);

Ids.findOne((err, data) => {
	if (!data) {
		const newIds = new Ids({
            guider_id: 0,
		});
		newIds.save();
	}
})
export default Ids