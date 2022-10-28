import createAxios from "../utils/requst";
import {addFormInt,recodsInt} from "../type/teacherType"

const api = {
    operaChapter: "/admin/lecturer",
    search:"/admin/lecturer/select"
};

export function getTeacher(){
    return createAxios({
        url:api.operaChapter,
        method:'get',
        params:{
            size:5
        }
    })
}

export function addTeacher(addFormList:addFormInt){
    return createAxios({
        url:api.operaChapter,
        method:'post',
        data:{
            name:addFormList.name,
            sex:addFormList.sex,
            introduce:addFormList.introduce
        }
    })
}

export function eddTeacher(eddTeacher:recodsInt){
    return createAxios({
        url:api.operaChapter,
        method:'put',
        data:{
            id:eddTeacher.id,
            name:eddTeacher.name,
            sex:eddTeacher.sex,
            introduce:eddTeacher.introduce
        }
    })
}

export function delTeacher(lecturerId:number){
    return createAxios({
        url:api.operaChapter,
        method:'delete',
        params:{
            lecturerId:lecturerId
        }
    })
}

export function searchTeacher(content:string){
    return createAxios({
        url:api.search,
        method:'get',
        params:{
            content:content,
            size:5
        }
    })
}