export interface Job {
    postName :string,
    country :string,
    jobType :string,
    jobLevel :string,
    qualification :string,
    salary :number,
    salaryType :string,
    jobClass :string,
    experience :string,
    shift :string,
    company :string,
    description :string,
    postedBy :string,
    vacancies :number,
    skill :string,
    userID :string
}

export interface InterfaceGetJob{
    startAfter :string,
    endBefore :string,
    limit :number
}
