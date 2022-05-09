import { Schema, model } from "mongoose"

class trackSchema extends Schema {
    constructor() {
        super({
            name: {
                type: String,
                required: true
            }
        });
    }

};

const trackModel = model('track', new trackSchema());

export default trackModel;