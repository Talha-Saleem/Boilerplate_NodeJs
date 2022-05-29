
import { HTTP500Error } from '../../error/baseError';
import { InterfaceGetJob, Job } from '../model/job';
import { database } from '../../config/firebase.includes';
import { jobsCollection } from '../../config/constants/collections.constants';
import { DEFAULT_PAGE_LIMIT } from '../../config/constants/constants';

export default class JobsDatabase {
  async postJob(newJob: Job): Promise<string> {
    try {
      const doc = await jobsCollection.add(newJob);
      return doc.id;
    } catch (e) {
      throw new HTTP500Error('Internal Server Error');
    }
  }

  async getJobs(reqParams: InterfaceGetJob): Promise<Job> {
    try {
      if (reqParams.startAfter) {
        if (reqParams.limit) {
          return await this.nextJobs(reqParams.startAfter, reqParams.limit);
        }
        return await this.nextJobs(reqParams.startAfter);
      } if (reqParams.endBefore) {
        if (reqParams.limit) {
          return await this.previousJobs(reqParams.endBefore, reqParams.limit);
        }
        return await this.previousJobs(reqParams.endBefore);
      }
      const first = jobsCollection
        .orderBy('postName')
        .limit(reqParams.limit ? reqParams.limit : DEFAULT_PAGE_LIMIT);
      const snapshot = await first.get();
      const data: Job = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return data;
    } catch (e) {
      throw new HTTP500Error('Internal Server Error');
    }
  }

  async nextJobs(
    jobId: string,
    pageLimit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<Job> {
    try {
      const cursor: any = await jobsCollection.doc(jobId).get();
      const next = jobsCollection
        .orderBy('postName')
        .startAfter(cursor)
        .limit(pageLimit);
      const snapshot = await next.get();
      const data: Job = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return data;
    } catch (e) {
      throw new HTTP500Error('Internal Server Error');
    }
  }

  async previousJobs(
    jobId: string,
    pageLimit: number = DEFAULT_PAGE_LIMIT,
  ): Promise<Job> {
    try {
      const cursor: any = await jobsCollection.doc(jobId).get();
      const previous = jobsCollection
        .orderBy('postName')
        .endBefore(cursor)
        .limit(pageLimit);
      const snapshot = await previous.get();
      const data: Job = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return data;
    } catch (e) {
      throw new HTTP500Error('Internal Server Error');
    }
  }

  async getUserJobs(uid: string): Promise<Array<Job>> {
    let jobsRef = database.collection('jobs');
    const jobs: Array<Job> = [];
    let data;
    try {
      jobsRef = await jobsRef.where('userID', '==', uid);
      data = await jobsRef.get();
      data.docs.map((doc: any) => {
        jobs.push({ id: doc.id, ...doc.data() });
      });
      return jobs;
    } catch (e) {
      throw new HTTP500Error('Internal Server Error');
    }
  }

  async searchJob(searchParams: Job): Promise<Array<Job>> {
    let jobsRef = database.collection('jobs');
    const jobs: Array<Job> = [];
    let data;
    try {
      if (searchParams.postName) {
        let { postName } = searchParams;
        const splitStr = postName.toString().toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
          splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        postName = splitStr.join(' ');

        jobsRef = await jobsRef
          .where('postName', '>=', postName)
          .where('postName', '<=', `${postName}\uf8ff`);
      }

      if (searchParams.country) {
        const { country } = searchParams;
        jobsRef = await jobsRef.where('country', '==', country);
      }

      if (searchParams.jobType) {
        jobsRef = await jobsRef.where('jobType', '==', searchParams.jobType);
      }

      if (searchParams.qualification) {
        jobsRef = await jobsRef.where(
          'qualification',
          '==',
          searchParams.qualification,
        );
      }

      if (searchParams.jobLevel) {
        jobsRef = await jobsRef.where(
          'jobLevel',
          '==',
          searchParams.jobLevel,
        );
      }

      if (searchParams.salary) {
        jobsRef = await jobsRef.where('salary', '==', searchParams.salary);
      }

      if (searchParams.salaryType) {
        jobsRef = await jobsRef.where(
          'salaryType',
          '==',
          searchParams.salaryType,
        );
      }

      if (searchParams.experience) {
        jobsRef = await jobsRef.where(
          'experience',
          '==',
          searchParams.experience,
        );
      }

      if (searchParams.shift) {
        jobsRef = await jobsRef.where('shift', '==', searchParams.shift);
      }

      if (searchParams.skill) {
        jobsRef = await jobsRef.where(
          'requiredSkill',
          '==',
          searchParams.skill,
        );
      }

      if (searchParams.jobClass) {
        jobsRef = await jobsRef.where(
          'jobClass',
          '==',
          searchParams.jobClass,
        );
      }

      data = await jobsRef.get();
      data.docs.map((doc: any) => {
        jobs.push({ id: doc.id, ...doc.data() });
      });

      return jobs;
    } catch (e) {
      throw new HTTP500Error('Internal Server Error');
    }
  }

  async updateJob(jobId: string, job: Job): Promise<void> {
    try {
      await jobsCollection.doc(jobId).update(job);
      return;
    } catch (e) {
      throw new HTTP500Error('Internal Server Error');
    }
  }

  async deleteJob(id: string): Promise<void> {
    try {
      await jobsCollection.doc(id).delete();
      return;
    } catch (e) {
      throw new HTTP500Error('Internal Server Error');
    }
  }

  async getJobByID(id: string): Promise<Job> {
    try {
      return await jobsCollection.doc(id).get();
    } catch (e) {
      throw new HTTP500Error('Internal Server Error');
    }
  }
}
