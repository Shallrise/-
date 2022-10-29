import createAxios from "../utils/requst";

const api = {
    operateach:'/admin/course'
}

interface operaForm{
    title:string,
    teacherId:number,
    hour:string,
    image:string,
    introduce:string,
}

interface editClassForm{
    title:string,
    teacherId:number,
    hour:number,
    image:string,
    introduce:string,
    id:number
}

export function getList(){
    return createAxios({
        url:api.operateach,
        method:'get'
    })
}

export function addClass(addform:operaForm){
    return createAxios({
        url:api.operateach,
        method:'post',
        data:{
            title:addform.title,
            teacherId:addform.teacherId,
            hour:addform.hour,
            image:addform.image,
            introduce:addform.introduce
        }
    })
}

export function editClass(editform:editClassForm){
    const imageUrl=editform.image.slice(33)
    return createAxios({
        url:api.operateach,
        method:'put',
        data:{
            title:editform.title,
            teacherId:editform.teacherId,
            hour:editform.hour,
            image:imageUrl,
            introduce:editform.introduce,
            id:editform.id
        }
    })
}

export function deleteClass(id:number){
    return createAxios({
        url:api.operateach,
        method:'delete',
        params:{
            courseId:id
        }
    })
}