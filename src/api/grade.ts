import createAxios from "../utils/requst";
import {addFormInt} from '../type/gradeType'
const api = {
    operagrade:'/admin/class',
    searchgrade:'/admin/class/select'
}

export function getClass(){
    return createAxios({
        url:api.operagrade,
        method:'get',
        params:{
            size:100
        }
    })
}

export function searchgrade(content:string){
    return createAxios({
        url:api.searchgrade,
        method:'get',
        params:{
            content:content
        }
    })
}

export function addGrade(addForm:addFormInt){
    return createAxios({
        url:api.operagrade,
        method:'post',
        data:{
            className:addForm.className,
            publicity:addForm.publicity,
            description:addForm.description,
            lecturerId:addForm.lecturerId,
            image:addForm.image
        }
    })
}

export function eddGrade(eddForm:addFormInt,id:number){
    return createAxios({
        url:api.operagrade,
        method:'put',
        data:{
            className:eddForm.className,
            publicity:eddForm.publicity,
            description:eddForm.description,
            id:id,
            image:eddForm.image
        }
    })
}

export function delGrade(classId:number){
    return createAxios({
        url:api.operagrade,
        method:'delete',
        params:{
            classId:classId
        }
    })
}