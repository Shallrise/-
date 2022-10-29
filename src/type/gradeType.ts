export interface recodsInt {
    id: number;
    className: string,
    code:string,
    number:number,
    publicity:string,
    description:string,
    createTime:string,
    image:string,
    name:string,
  }

interface pageDataInt {
    current: number;
    size: number;
    total: number;
}

export class gradeData {
    pageData: pageDataInt = {
      current: 0,
      size: 5,
      total: 0,
    };
    records: recodsInt[] = [];
  }

export interface addFormInt{
    className:string,
    publicity:string,
    description:string,
    image:string,
    lecturerId:number
}
  export class addformData {
    addForm: addFormInt = {
        className:'',
        publicity:'',
        description:'',
        image:'',
        lecturerId:0
    };
  }

  export interface eddFormInt{
    className:string,
    publicity:string,
    description:string,
    image:string
}

export class eddformData {
    addForm: eddFormInt = {
        className:'',
        publicity:'',
        description:'',
        image:'',
    };
  }
 