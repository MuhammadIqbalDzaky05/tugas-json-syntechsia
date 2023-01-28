function getProductsUrl(keyword) {
    return `https://www.blibli.com/backend/search/products?searchTerm=${keyword}`
}

function getProducts(keyword){
    // const promise = new promise((resolve, reject) => {
        const ajax = new XMLHttpRequest()
        ajax.onload = function () {
            const data = JSON.parse(ajax.responseText)
            console.log(data, "<<< ini object");
            console.log(ajax.responseText, "<<< ini JSON");

        if (data.code === 200) {
            clearProducts()
            displayProduct(data)
            // resolve(data)
        } else {
            if (data.message === "No message available") {
                alert("Salah")
            }
            // reject(data)
        }
    }
    const url = getProductsUrl(keyword);
    ajax.open("GET", '../api/response.json')
    ajax.send()
    
    // return promise;
}

function clearProducts(){
    const productUl = document.getElementById('products');
    productUl.textContent = ""
}

function displayProducts(data){
    console.log(data);
    data.data.products.forEach(product => displayProduct(product))
}

function clearTableProducts(){
    const productUl = document.getElementById("table-products")
    productUl.textContent = ""
}

function displayTableProducts(data){
    const table = document.createElement("table")
    table.setAttribute("border", 1);

    let index = 0;
    data.data.products.forEach(product => {
        table.insertRow(index).insertCell(0).innerText = product.name;
        index ++
    })

    const tableProduct = document.getElementById("table-products");
    tableProduct.appendChild(table)
}

function displayProduct(product) {
    const productLi = document.createElement('li');
    productLi.textContent = `${product.name} : ${product.price}`;

    const productUl = document.getElementById("products");
    productUl.appendChild(productLi)
}

function buttonClick() {
    const promise = getProducts(document.getElementById("keyword").value)
    clearProducts()
}

// promise
//     .then(function (value) {
//         const valueBaru = value.title
//         displayProduct(valueBaru)
//     })