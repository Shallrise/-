interface recodsInt {
  hot: number;
  hour: number;
  id: number;
  image: string;
  kind: number;
  teacher: string;
  title: string;
  teacherId:number;
}

interface pageDataInt {
  current: number;
  size: number;
  total: number;
}

export class ClassData {
  pageData: pageDataInt = {
    current: 0,
    size: 10,
    total: 2,
  };
  records: recodsInt[] = [];
}

export interface addformInt {
  title: string;
  teacherId:number;
  hour: string;
  image: string;
  introduce: string;
}

export class addformData {
  addForm: addformInt = {
    title: "",
    teacherId:0,
    hour:"",
    image:'',
    introduce:''
  };
}

export interface eddformInt {
  id: number;
  image: string;
  introduce: string;
  teacherId: number;
  hour: number;
  title: string;
}

export class eddformData {
  editForm: eddformInt={
    id: 0,
    image: '',
    introduce: "",
    teacherId: 0,
    hour: 0,
    title: ""
  };
}
