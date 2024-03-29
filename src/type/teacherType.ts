export interface recodsInt {
    id: number;
    name: string;
    sex:string,
    introduce:string;
  }

interface pageDataInt {
    current: number;
    size: number;
    total: number;
}

export class teacherData {
    pageData: pageDataInt = {
      current: 0,
      size: 5,
      total: 0,
    };
    records: recodsInt[] = [];
  }

export interface addFormInt{
    name:string,
    sex:string,
    introduce:string,
    id:number
}

export class addformData {
    addForm: addFormInt = {
        name:'',
        sex: '',
      introduce:'',
      id:0
    };
  }