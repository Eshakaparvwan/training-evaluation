import trackModel from "./track.schema"
import { Itrack } from "./track.types"

const createTrack = (track: Itrack) => trackModel.create(track);
const updateTrack = (track: Itrack) => trackModel.updateOne({
    _id: track._id
}, track);
const getAll = () => trackModel.find({});
export default {
createTrack,
updateTrack,
getAll,
}