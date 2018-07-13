const fs =require("fs")

//封装 new Promise实例函数
function readFile(filePath){
    return new Promise(function(resolve,reject){
        fs.readFile(filePath,"utf8",function(err,data){
            if(err){
                reject(err); //链接Promise 的then 
            }else{
                resolve(data)
            }
        })
    });
}

readFile("./data/1.txt").then(function(data){
    console.log(data)
    return readFile("./data/2.txt"); //当返回值是Peomise实例的时候 后面then中的参数函数就是promise
},function(err){
    console.log(err)
}).then(function(data){
    console.log(data);
    return readFile("./data/3.txt");
}).catch(function(err){
    console.log(err)
}).then(function(data){
    console.log(data)
});



/* 
Promise 本质上是js新语法糖，这种语法对语法功能没有影响，方便程序员使用，
通常使用语法糖能够增加程序的可读性，从而减少

*/