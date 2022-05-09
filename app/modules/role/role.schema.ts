import { Schema, model } from "mongoose"

class roleSchema extends Schema {
    constructor() {
        super({
            name: {
                type: String,
                required: true
            }
        });
    }

};

const roleModel = model('role', new roleSchema());

export default roleModel;