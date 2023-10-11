fetch("http://localhost:3000/PRODUCTS", {
    method: "GET"
})
.then((response) => response.json())
.then((data) => {
    console.log(data)
    const all_products = document.getElementById("all_products")
    
    for(element of data) {            //data.map((element) => "OR CAN USE .MAP METHOD"
        // console.log (element);
        all_products.innerHTML += `<div id="card">
            <img onclick="displaySingleProduct(${element.id})" src= "${element.image}"
            <h6>${element.title}</h6>
            <button onclick="deleteProducts(${element.id})" id="deleteButton"> DELETE </button>
            <button onclick="edit(${element.id})">Edit</button>
        </div>`
    }
})

function displaySingleProduct(id)
{ 
    fetch(`http://localhost:3000/PRODUCTS/${id}`, {
    method: "GET"
    })
    .then((response) => response.json())
    .then((data) => {
        const single_product = document.getElementById ("single_product")
        single_product.innerHTML = `<div>
        <img src= "${data.image}"></img>
        <h6>${data.title}</h6>
        <p>${data.description}</p>
        </div>`
    console.log(data)
    })
}

function deleteProducts(id)
{ 
    fetch(`http://localhost:3000/PRODUCTS/${id}`, {
    method:"DELETE"
    })
    .then((response)=> response.json())
    .then((data) => {
        alert("PRODUCT DELETED SUCCESSFULLY!")
    })
}

const addForm = document.getElementById("addForm")
addForm.addEventListener("submit", function (event){
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const image_url = document.getElementById("image_url").value;

    fetch(`http://localhost:3000/PRODUCTS`, {
    method: "POST",
    body: JSON.stringify ({
        title: title,
        image: image_url,
        description: description
    }),
    headers: {
        "content-type": "application/json",
    }
    })
    .then((response) => response.json())
    .then((data) => {
        alert("PRODUCT ADDED SUCCESSFULLY!")
    })
    console.log (title, " ", description, " ", image_url )
})

function edit(id){
    fetch(`http://localhost:3000/PRODUCTS/${id}`)
    .then((response)=> response.json())
    .then((res)=> {
        console.log(res);
        const updateContainer = document.getElementById("updateContainer")
        updateContainer.innerHTML=`
        <h2>Update Form:</h2>
        <div>
            <input type="text" id="update_title" value="${res.title}" placeholder="Enter Title">
            <input type="text" id="update_description" value="${res.description}" placeholder="Enter description">
            <input type="text" id="update_image_url" value="${res.image}" placeholder="Enter image url">
            <button onclick="update(${id})" type="submit">UPDATE</button>
        </div>`
    })

}

function update (id) {

    const update_title = document.getElementById("update_title").value
    const update_description = document.getElementById("update_description").value
    const update_image_url = document.getElementById("update_image_url").value
    
    fetch(`http://localhost:3000/PRODUCTS/${id}`, {
    method: "PATCH",
    body: JSON.stringify ({
        title: update_title,
        image: update_image_url,
        description: update_description
    }),
    headers: {
        "content-type": "application/json",
    }
    })
    .then((response) => response.json())
    .then((data) => {
        alert("PRODUCT UPDATED SUCCESFULLY!")
    })
    // console.log (update_title)
}


