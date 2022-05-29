// const express =require('express');


let chai = require("chai");
let assert = require("chai").assert;
let expect = require("chai").expect;
let chaiHttp = require("chai-http");
const db = require("../../src/jobs/db.jobs");
const request = require('request')

chai.use(chaiHttp);

describe("jobs/getUserJobs", function () {
  it("it should get all jobs", async function () {
    const result = await db.getUserJobs("jO584jGAK6f9qOOdbHeHt69gpQBy");
    assert.typeOf(result, "Array");
  }).timeout(8000);
});

describe("jobs/create", function () {
  it("it should create job in database", async function () {
    const job: any = {
      postName: "testing",
      country: "jsak",
      company: "kjdsal",
      description: "kjklj",
      postedBy: "abc@gmail.com",
      vacancies: 87986,
      jobClass: "Feature",
      jobLevel: "Junior",
      experience: "2 year",
      shift: "Evening",
      skills: "Adobe Illustrator",
      jobType: "Part Time",
      salary: "20,000 - 30,000",
      salaryType: "Week",
      qualification: "PHD",
      userID: "aO584jGAK6f9qOOdbHeHt69gpQBy",
    };
    const result = await db.postJob(job);
    assert.typeOf(result, "string");
  }).timeout(8000);
});

describe("get all jobs",function () {
  it('it should return all jobs',async () => {
    let url:string = "http://localhost:5001/jobvictor-fe931/us-central1/jobs/get";
    request(url, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
    
  })
})
})
