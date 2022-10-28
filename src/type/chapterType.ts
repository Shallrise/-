interface recodsInt {
    courseId: string;
    title: string;
    video:string;
  }

  interface pageDataInt {
    current: number;
    size: number;
    total: number;
  }

 export interface eddformInt{
    id: string;
    title: string;
    video:string;
  }


  export class ChapterData {
    pageData: pageDataInt = {
      current: 0,
      size: 10,
      total: 3,
    };
    records: recodsInt[] = [];
  }

  export class addformData {
    addForm: recodsInt = {
      courseId:'',
      title: "",
      video:''
    };
  }

  export class eddformData {
    editForm: eddformInt = {
        id:'',
        title: "",
        video:''
      };
  }