import { Schema, Types, model, Document } from "mongoose";
import { IStudent } from "./student.types";

class studentSchema extends Schema {
    constructor() {
        super({
            // userId: {
            //     type: Types.ObjectId,
            //     required: false
            // },
            name: {
                type: String,
                required: false
            },
            age: {
                type: Number,
                required: true
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            rating: [
                {
                    week: { type: Number, default: 1, required: true },
                    logicalRating: { type: Number, required: true },
                    communicationRating: { type: Number, required: true },
                    AssignmentRating: { type: Number, required: true },
                    ProActivenessRating: { type: Number, required: true },
                }
            ],
            track: {
                type: Types.ObjectId,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now,
                required: false
            },
            lastEvaluated: {
                type: Date,
                default: Date.now,
                required: false
            },
            trainerAssigned: [
                { 
                    type: Types.ObjectId, 
                    required: true, 
                    ref: "user" 
                }
            ]



        }, {
            timestamps: true
        })

    }

}

type studentDocument = Document & IStudent;
const studentModel = model<studentDocument>('Student', new studentSchema());
export default studentModel;