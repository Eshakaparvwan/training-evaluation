export interface IStudent{
    _id?: string,
    name:string,
    age:number,
    email:string,
    rating:object[],
    track:string,
    createdAt?:Date,
    lastEvaluated?: Date,
    trainerAssigned:string[]
};

export interface Ifilter {
    page?: number;
    itemsPerPage?: number;
    track?: string;
    overallAverage?: number;
    trainer?: string;
  }