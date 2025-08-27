


#### Rxjs    

 Rxjs是一个使用可观察序列编写异步和基于事件的程序的库，通过操作符处理事件

 可以将Rxjs视为处理事件的loadsh


 ```javascript

 import {Observable,timer} from 'rxjs'


// 延迟执行
 const exampleRimer = timer(1000)
 exampleRimer.subscribe({
    bext:value=>console.log('timer' ,value),
    complete:()=>console.log('complete')
 })

// 错误处理
const errorProne = new Observable((subscriber)=>{
subscriber.error(new Error('this is an error'))
})

const handledObservable = errorProne。pipe(
    retry(3),
    catchError((err)=>{
        console.log('catch',err)
        return throwError(()=> new Error('Error after retries'))
    })
)
handledObservable.subscribe({
    error:(err)=>{
        console.log('subscribe error Final Error:', err)
    }
})
 
 ```