interface recodsInt {
    courseId: number;
    title: string;
    video:string;
  }

  interface pageDataInt {
    current: number;
    size: number;
    total: number;
  }

  interface eddformInt{
    id: number;
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
      courseId:0,
      title: "",
      video:''
    };
  }

  export class eddformData {
    editForm: eddformInt = {
        id:0,
        title: "",
        video:''
      };
  }