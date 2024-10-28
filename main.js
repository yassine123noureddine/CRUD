let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood='creat';
let tmp;
// get total
function getTotal(){
   if(price.value !== ''){
    let result= (+price.value + +taxes.value + +ads.value)- +discount.value ;
    total.innerHTML=result;
    total.style.background ='#040'
   }else{
    total.innerHTML='';
    total.style.background ='rgb(163, 4, 4)'
   }

}

// creat prodact 
let dataPro ;
if(localStorage.product != null){
    dataPro= JSON.parse(localStorage.product)

}else{
    dataPro=[];
}

submit.onclick=function(){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    // count
    if(mood==='creat'){

        if(newpro.count>1){
            for(let i=0;i<newpro.count;i++){
                dataPro.push(newpro)
            }
        }else{
            dataPro.push(newpro)
        }
    }else{
     dataPro[tmp]=newpro;
     mood='creat';
     count.style.display='block';
     submit.innerHTML= 'creat';
    }
   
    // save localstorage
    localStorage.setItem('product',       JSON.stringify(dataPro))
    clearDataInput()
    showDataRead()
}

// clear inputs
function clearDataInput(){
    title.value ='';
    price.value ='';
    taxes.value ='';
    ads.value   ='' ;
    discount.value  ='';
    total.innerHTML ='';
    count.value     ='';
    category.value  ='';
}

// read 
function showDataRead(){
    getTotal()
    let table=`` ;
    let tbody=document.getElementById('tbody');
    for(let i=0;i<dataPro.length ;i++){
        table+=`
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button  onclick='updutData(${i})' id="update">update</button></td>
        <td><button onclick='deleteData(${i})' id="delet">delet</button></td>
    </tr>                        

        `

    }
    tbody.innerHTML=table
    let btndelete=document.getElementById('deletAll');
    if(dataPro.length>0){
        btndelete.innerHTML=`
        <button onclick='deleteAll()' id="delettable" >delet All(${dataPro.length})</button>

        `
    }else{
        btndelete.innerHTML='';
    }



}
showDataRead()


// delete Data
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro);
    showDataRead()
}

// delet all table
function deleteAll(){
 localStorage.clear();
dataPro.splice(0)
showDataRead()
}

// updut Data
function updutData(i){
    title.value=dataPro[i].title
    price.value=dataPro[i].price
    taxes.value=dataPro[i].taxes
    ads.value=dataPro[i].ads
    discount.value=dataPro[i].discount
    getTotal()
    count.style.display='none'
    category.value=dataPro[i].category
    submit.innerHTML='update'
    mood='update';
    tmp=i
    scroll({
        top:0,
        behavior:'smooth'

    })
}
// methode search in table to titel or category

let searchMode='title';
function getSearchMood(id){
    let search=document.getElementById('search');
    if(id=='searchTitle'){
        searchMode='title';
        search.placeholder='search by Title'
    }else{
        searchMode='category';
        search.placeholder='search by Category'

    }
    search.focus();


}
function searchdata(value){
    let table='';
    
    if(searchMode=='title'){
     for(let i=0 ;i<dataPro.length;i++){
        if(dataPro[i].title.toLowerCase().includes(value)){
            table+=`
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button  onclick='updutData(${i})' id="update">update</button></td>
            <td><button onclick='deleteData(${i})' id="delet">delet</button></td>
        </tr>                        
    
            `
    
        }
     }
    }else{
        for(let i=0 ;i<dataPro.length;i++){
            if(dataPro[i].category.toLowerCase().includes(value)){
                table+=`
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button  onclick='updutData(${i})' id="update">update</button></td>
                <td><button onclick='deleteData(${i})' id="delet">delet</button></td>
            </tr>                        
        
                `
        
            }
         }
    

    }
tbody.innerHTML=table;
}