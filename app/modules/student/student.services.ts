import { ICredentials } from "../../utility/credentials";
import userRepo from "../user/user.repo";
import studentRepo from "./student.repo";
import { IStudent, Ifilter } from "./student.types";
import { Roles } from "../../utility/populate"

const createStudent = (student: IStudent) => studentRepo.createStudent(student);
const findOne = (credentials: ICredentials) => studentRepo.findOne(credentials);
const getAll = () =>studentRepo.getAll();
const getOne = (id: string) => studentRepo.getOne(id);
const updateStudent = (student: IStudent) => studentRepo.updateStudent(student);

const addRating = async (id: string, rating: object) => {
    const data = await studentRepo.getOne(id);
    let numberOfDays = await studentRepo.calculatenumberOfDays(id);
    let lastEvaluatedDays = numberOfDays[0].numberOfDays
    if (lastEvaluatedDays >= 7) {

        const lastWeek = await studentRepo.getWeekValue(id);
        const { lastEvaluatedWeek } = lastWeek[0];
        const currentWeek = lastEvaluatedWeek + 1;
        console.log(currentWeek);
        const ratingObject = { week:currentWeek, ...rating };
        const result = await studentRepo.addNewRating(id, ratingObject);
        return result;


    }
    throw { message: "Already updated this week " }

}

const calculateAvg= async (filter: Ifilter, role: string, id: string) => {
    let updatedResult = [];
    let result = await studentRepo.getAverage(filter);
    // console.log(result)
    return result;
    // if (role === Roles.admin) {
    //     // console.log("if")
     
    // } else {
        
    //   for (let r of result) {
    //     const ids = r.trainerAssigned.map((id: string) => id.toString());
    //     // console.log(ids)
    //     if (ids.includes(id.toString())) {
    //         console.log(id);
            
    //       updatedResult.push(r);
    //     }
    //   }
    //   console.log(updatedResult);
      
    //   return updatedResult;
    // }
  };
const getTrackData=(track:string)=>studentRepo.getTrackData(track);
export default {
    createStudent,
    findOne,
    getAll,
    getOne,
    updateStudent,
    addRating,
    calculateAvg,
    getTrackData,
};