import createAxios from "../utils/requst";

const api = {
    operateach:'/admin/course'
}

interface operaForm{
    title:string,
    teacher:string,
    hour:string,
    image:string,
    introduce:string,
}

interface editClassForm{
    title:string,
    teacher:string,
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
            teacher:addform.teacher,
            hour:addform.hour,
            image:addform.image,
            introduce:addform.introduce
        }
    })
}

export function editClass(editform:editClassForm){
    return createAxios({
        url:api.operateach,
        method:'put',
        data:{
            title:editform.title,
            teacher:editform.teacher,
            hour:editform.hour,
            image:editform.image,
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