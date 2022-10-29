export interface recodsInt {
    id: number;
    className: string,
    code:string,
    number:number,
    publicity:string,
    description:string,
    createTime:string
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
    description:string
}
  export class addformData {
    addForm: addFormInt = {
        className:'',
        publicity:'',
        description:''
    };
  }
 