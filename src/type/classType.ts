interface recodsInt{
    hot:number,
    hour:number,
    id:number,
    image:string,
    kind:number,
    teacher:string,
    title:string
}

interface pageDataInt{
    current:number,
    size:number,
    total:number
}

export class ClassData{
    pageData:pageDataInt={
        current:0,
        size:10,
        total:2
    }
    records:recodsInt[]=[]
}

export interface addformInt{
    title:string,
    teacher:string,
    hour:string,
    image:string,
    introduce:string
}