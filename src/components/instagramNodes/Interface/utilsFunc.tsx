export const sleep = (time:number) =>{
    return new Promise((res)=>setTimeout(() => {
    }, time))
}