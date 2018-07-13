const arr = [2,4,6,8,10];

//将数据乘以2
const arr2 = arr.map(el=>el*2)
console.log(arr2)

//遍历一遍数组，prev为前面数据的累加
const arr3 = arr.map(el=>el*2).reduce((prev,el)=>prev+el,0)
console.log(arr3)

//filter过滤  所有值除以2   
const avg = arr.filter((el)=>{return (el%2 === 0)})
console.log(avg)

//find 找出数组里面第一个满足条件的对象
const findObj = arr.find((el)=>{return (el > 9)})
console.log(findObj)

//some 找出数组是否有符合的对象，有则返回true
const someObj = arr.some((el,index,arr)=>{return (el > 9)})
console.log(someObj)

//every 判断是否所有数组都满足条件
const everyObj = arr.every((el)=>{return (el >= 2)})
console.log(everyObj)

//includes 是否包含某对象

const ret = arr.includes(2);
console.log(ret)

if(arr.includes(2)){
    //是否包含2
}

// ...obj 展开运算符
// func(...arr);

function fn(a,...arr){
    console.log(arr)
    // console.log(object.prototype.toString.arguments);
}
fn(1,2,4,3);

const obj = {
    m:3,
    multiple(n){
        return this.m * n 
    }
    //multiple:function multiple(n){}
}
obj.m = 4;
console.log(obj.multiple(4))

//面向对象就是模拟一个事物，例如一个人，他有行为与自身的属性

//bind 强制绑定一个this指针 柯里化(curry)
function fn1(){
    console.log(this.text);
}
fn1(); //undefined
fn1.apply({text:'1'});
fn1.call({text:'1'});

function main(){
    const obj = {
        text:'1'
    }
    function fn(){
        console.log(this.text + n);
    }
    return fn.bind(obj,10)
}

const f = main();
f();


`************** 面向对象－汇率转换 *************`

//兑换中心
class ExchangeCenter{
    
    constructor (){
        this.huilvTable_ = {}

        this.startRefreshHuilvTable()

    }

    huilv(from,to){
        const huilvFrom = this.huilvtable_[from]
        const huilvTo = this.huilvTable_[to]
        
        if(!huilvFrom || !huilvTo){
            throw new Error('不要浪费我的时间，瞎编函数')
        }
    
        return huilvFrom / huilvTo
    }

    startRefreshHuilvTable(){
        setInterval(_ =>{
            ajax('http://renmin.../huilvTable.json').then(table=>{
                this.huilvTable_ = table
            }).catch(err=>{
                console.log(err)
            })
        },1000*60)
    }

}

const exCenter = new ExchangeCenter()

//转换机制
class Currency{
    constructor(amount,type){
        this.amount_ = amount
        this.type_ = type
    }

    toDoolar(){
        return this.amount_ = exCenter.huilv(this.type_,"dollar")
    }

}

class ChuNa{
    saveMoney(curreny){
        this.jizhang(curreny)
        this.sendBank(curreny)
    }
    jizhang(curr){
        const amountDollar = curr.toDoolar();
        model.addLine(amountDollar,Date.now())
    }

    sendToBank(curr){
        //银行
        theBank.receive(curr,this)
    }
}

const theChuna =  new ChuNa("Wang")

(function main(){
    const money = new Currency(10,'RMB')
    //发出一个存钱的消息
    theChuna.saveMoney(money)
})()

//能不用继承就不用继承




`************** 面向对象－异步专题 *************`

// Context 程序执行的现场

//promise

window.fetch('//xx.com/1').then(data=>{
    return window.fetch('//xx.com/2')
}).then(data=>{
    return window.fetch('//xx.com/3')
}).then(data=>{
    alert('OK')
})

//npm i axios


function timeout(){
    //...
}

function delay3s(fn){
    setTimeout(_=>{
        fn()
    },3000)
}

//pending => fulfill=> reject
//try--catch 没办法捕获到异步异常

//pending过程 
function delay3sPromise(fn){
    return new Promise((resolve,reject)=>{ //resolve 结论  、 reject 出错时执行
        setTimeout(()=>{
            try {
                const ret = fn();
                resolve(ret)
            } catch(err){
                reject(err)
            }
        },3000)
    })
}

function fn(){
    console.log(Date.now())
}

//fulfill
delay3sPromise(fn).then(_=>{
    return delay3sPromise(fn)
}).then(_=>{
    return delay3sPromise(fn)
}).catch(err=>{ //reject过程
    console.error(err)
})

//同步
function delay3sPromise(fn){
    return new Promise(_=>{
        try{
            return Promise.resolve(ret)
        }catch(err){
            return Promise.reject(ret)
        }
    })
}

delay3sPromise(fn)

`*********** 宏任务与微任务认识 *************`
console.log(0)
serTimeout(_=>console.log(1))

let prom = new Promise((resolve,reject)=>{
    console.log(2)
    resolve()
    console.log(3)  //仍处于同步任务
}).then(_=>{        //开始执行异步任务－微任务
    console.log(4)
}).then(_=>{
    console.log(5)
}).catch(err=>{

})

console.log(6)

// 执行顺序 0->2->3->6->4->5->1
    //同步任务先执行，然后执行微任务，最后执行宏任务

//微任务的优先级一定比宏任务的高

//macro task 宏任务 －(setTimeout)

//micro task 微任务 -(promise)

//async 是 Promise 的语法糖 

// 1 callback 转 Promise   2 Promise 转 async   3 callback 转 async
function ajax(url,callback){

}

function callback(err,content){
    
}

//callback 转 Promise
function ajaxPromise(url){
    return new Promise((resolve,reject)=>{
        ajax(url,(err,content)=>{
            if(err){
                reject(err)
                return
            }
            resolve(content)
        })
    })
}

ajaxPromise('xxx.com').then(content=>{

}).catch(err=>{

})

//Promise 转 async 
async function main(){
    try{
        const content = await ajaxPromise('xxx.com')

    }catch(err){

    }
}

async function ajaxAsync(url){
    return await ajaxPromise(url)
}

//callback 转 async