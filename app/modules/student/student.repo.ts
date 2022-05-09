import { ICredentials } from "../../utility/credentials";
import studentModel from "./student.schema";
import { Ifilter, IStudent } from "./student.types";
import { Types } from "mongoose"
import UserModel from "../user/user.schema";
import { IUser } from "../user/user.type";
const createStudent = (student: IStudent) => studentModel.create(student);
const findOne = (credentials: ICredentials) => studentModel.findOne(credentials);
const getAll = () => studentModel.find();
const getOne = (id: string) => studentModel.findById(id);
const updateStudent = (student: IStudent) => studentModel.updateOne({
  _id: student._id
}, student)

const calculatenumberOfDays = (id: string) => studentModel.aggregate([
  { $match: { _id: new Types.ObjectId(id) } },
  {
    $project: {
      numberOfDays: {
        $round: { $divide: [{ $subtract: ["$$NOW", "$updatedAt"] }, 86400000] }
      }
    }
  }

])
const getWeekValue = (id: string) => studentModel.aggregate([
  { $match: { _id: new Types.ObjectId(id) } },
  {
    $project: {
      lastEvaluatedWeek: { $size: '$rating' }
    }
  }
])

const addNewRating = (id: string, data: object) => studentModel.update(
  { _id: id },
  { $push: { rating: { ...data } } }
)

const getTrackData = (track: string) => studentModel.aggregate([
  { $match: { track: new Types.ObjectId(track) } },
])

const overallAverage=async(id:string)=>studentModel.aggregate([
  { $unwind: "$rating" },
  {
    $group: {
      _id: "$_id",
      averageLogicRating: { $avg: "$rating.logicRating" },
      averageCommunicationRating: { $avg: "$rating.communicationRating" },
      averageAssignmentsRating: { $avg: "$rating.AssignmentRating" },
      averageProactivenessRating: { $avg: "$rating.ProActivenessRating" },
    },
  },
  {
    $project: {
      _id: 1,
      averageLogicRating: 1,
      averageCommunicationRating: 1,
      averageAssignmentsRating: 1,
      averageProactivenessRating: 1,
      averageRating: {
        $avg: [
          "$averageLogicRating",
          "$averageCommunicationRating",
          "$averageAssignmentsRating",
          "$averageProactivenessRating",
        ],
      },
    },

}])

const getAverage = async (filters: Ifilter) => {
  const { page, itemsPerPage, track, overallAverage } = filters;
  // console.log(page,itemsPerPage,track,overallAverage);
  
  const queryFilters: any[] = [];
  const matchQueries: any[] = [];
  const match = {
    $match: {
      $and: matchQueries,
    },
  };
  const averages = await studentModel.aggregate([
    { $unwind: "$rating" },
    {
      $group: {
        _id: "$_id",
        averageLogicRating: { $avg: "$rating.logicRating" },
        averageCommunicationRating: { $avg: "$rating.communicationRating" },
        averageAssignmentsRating: { $avg: "$rating.AssignmentRating" },
        averageProactivenessRating: { $avg: "$rating.ProActivenessRating" },
      },
    },
    {
      $project: {
        _id: 1,
        averageLogicRating: 1,
        averageCommunicationRating: 1,
        averageAssignmentsRating: 1,
        averageProactivenessRating: 1,
        averageRating: {
          $avg: [
            "$averageLogicRating",
            "$averageCommunicationRating",
            "$averageAssignmentsRating",
            "$averageProactivenessRating",
          ],
        },
      },
    },
  ]);
  // console.log(averages);
  
  if (overallAverage) {
    const ids = averages.reduce((accumulator, currValue) => {
      if (currValue.averageRating > overallAverage)
        accumulator.push(currValue._id);
      return accumulator;
    }, []);
    matchQueries.push({ _id: { $in: ids } });
    // console.log(matchQueries)
  }
  if (track) {
    matchQueries.push({ track: new  Types.ObjectId(track) });
  }
  if (matchQueries.length) queryFilters.push(match);
  // if (page && itemsPerPage) {
  //   queryFilters.push({ $skip: (+page - 1) * +itemsPerPage });
  //   queryFilters.push({ $limit: +itemsPerPage });
  // }
  // console.log(queryFilters)
  let students = await studentModel.aggregate([
    ...queryFilters,
    {
      $lookup: {
        from: "tracks",
        localField: "track",
        foreignField: "_id",
        as: "track",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "trainerAssigned",
        foreignField: "_id",
        as: "trainerAssigned",
      },
    },
    // {
    //   $lookup: {
    //     from: "students",
    //     localField: "_id",
    //     foreignField: "_id",
    //     as: "student",
    //   },
    // },
    {
      $project: {
        _id: 1,
        //studentId: 1,
        name: 1,
        age: 1,
        email: 1,
        track: 1,
        lastEvaluated: 1,
        // trainerAssigned:1,
        "trainerAssigned._id": 1,
        "trainerAssigned.name": 1,
        // "student._id": 1,
        // "student.name": 1,
        // "student.email": 1,
      },
    },
  ]);
  // console.log(students)
  students = students.map((user: IUser) => {
    return {
      ...user,
      averages: averages.find(
        (re: { _id: string }) => re._id.toString() === user._id.toString()
      ),
    };
  });
  // console.log(students)
  return students;
};

export default {
  createStudent,
  findOne,
  getAll,
  getOne,
  updateStudent,
  calculatenumberOfDays,
  addNewRating,
  getWeekValue,
  getAverage,
  getTrackData,
};