import createAxios from "../utils/requst";

const api = {
  operaChapter: "/admin/course/section",
};

interface addFormInt{
    courseId:number,
    title:string,
    video:string
}

interface eddFormInt{
    title:string,
    video:string,
    id:number
}

export function getChapter(courseId: number) {
  return createAxios({
    url: api.operaChapter,
    method: "get",
    params:{
        courseId:courseId
    }
  });
}

export function addChapter(addFormList:addFormInt){
    
    return createAxios({
        url:api.operaChapter,
        method:'post',
        data:{
            courseId:addFormList.courseId,
            title:addFormList.title,
            video:addFormList.video
        }
    })
}

export function eddChapter(edd:eddFormInt){
    const videoUrl=edd.video.slice(26)
    return createAxios({
        url:api.operaChapter,
        method:'put',
        data:{
            title:edd.title,
            video:videoUrl,
            id:edd.id
        }
    })
}

export function delChapter(sectionId:number){
    return createAxios({
        url:api.operaChapter,
        method:'delete',
        params:{
            sectionId:sectionId
        }
    })
}
