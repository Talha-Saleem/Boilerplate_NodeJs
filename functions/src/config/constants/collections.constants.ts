import { database } from "../firebase.includes";


const jobsCollection = database.collection("jobs");
const userCollection = database.collection("users");


export{jobsCollection,userCollection};