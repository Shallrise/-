import axios from "axios";
import createAxios from "../utils/requst";

const api = {
    operaclass:'/admin/course'
}

interface operaForm{
    title:string,
    teacher:string,
    hour:string,
    image:string,
    introduce:string,
    id?:number
}

export function getList(){
    return createAxios({
        url:api.operaclass,
        method:'get'
    })
}

export function addClass(addform:operaForm){
    return createAxios({
        url:api.operaclass,
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

export function editClass(editform:operaForm){
    return createAxios({
        url:api.operaclass,
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
        url:api.operaclass,
        method:'delete',
        params:{
            courseId:id
        }
    })
}