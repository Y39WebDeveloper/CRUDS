let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mode = 'create';
let searchMode = 'title';
let tmp;

//get total

function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#080';
    }else{
        total.innerHTML = "";
        total.style.background = '#f33';
    }
}

// create product

let dataProduct;
if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product);
}else{
    dataProduct = [];
}

submit.onclick = function(){
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if(title.value != '' && price.value != "" && category.value !="" && newProduct.count < 100){
        if(mode === 'create'){
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct);
                }
            } else {
                dataProduct.push(newProduct);
            }
        }else{
            dataProduct[tmp] = newProduct;
            mode = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearInputsValue();
    }
    // save local storage
    localStorage.setItem('product', JSON.stringify(dataProduct));
    showData();
}

// clear inputs

function clearInputsValue(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read

function showData(){
    getTotal();
    let table = '';
    for(let i = 0; i < dataProduct.length; i++){
        table +=
            `<tr>
                <td>${i+1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deletData(${i})" id="delete">Delete</button></td>
            </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDeletAll = document.getElementById('deletAll');
    if(dataProduct.length > 0){
        btnDeletAll.innerHTML = `
        <button onclick="deletAll()">Delete all(${dataProduct.length})</button>
        `;
    }else{
        btnDeletAll.innerHTML = '';
    }
}
showData();

// delet Product

function deletData(i){
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}

// delet all product

function deletAll(){
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}

// update

function updateData(i){
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    category.value = dataProduct[i].category;
    count.style.display = "none";
    submit.innerHTML = "Update";
    mode = "update";
    getTotal();
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    });
}

// search

function getSearchMode(id){
    let search = document.getElementById('search');
    if (id == 'searchTitle'){
        searchMode = 'title';
    }else{
        searchMode = 'category';
    }
    search.placeholder = `Search by ${searchMode}`;
    search.focus();
    search.value = '';
    showData();
}

function searchData(value){
    let table = '';
    for(let i = 0; i < dataProduct.length; i++){
        if (searchMode == 'title') {
            if (dataProduct[i].title.includes(value.toLowerCase())) {
                table +=
                    `<tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deletData(${i})" id="delete">Delete</button></td>
                </tr>`;
            }
        } else {
            if (dataProduct[i].category.includes(value.toLowerCase())) {
                table +=
                    `<tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deletData(${i})" id="delete">Delete</button></td>
            </tr>`;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

// clean data
