import trackRepo from "./track.repo";
import { Itrack } from "./track.types"

const createTrack = (track: Itrack) => trackRepo.createTrack(track);
const updateTrack = (track: Itrack) => trackRepo.updateTrack(track);
const getAll = () => trackRepo.getAll();
export default {
createTrack,
updateTrack,
getAll,
}