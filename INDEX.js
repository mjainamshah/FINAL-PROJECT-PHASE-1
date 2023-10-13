// FETCH A LIST OF PRODUCT FROM THE DATABASE AND DISPLAY IT
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
            <img onclick="displaySingleProduct(${element.id})" src= "${element.image}"/>
            <div id="buttonFormating">
            <button onclick="deleteProducts(${element.id})" id="deleteButton"> DELETE </button>
            <button onclick="edit(${element.id})" id="editButton">EDIT</button>
            </div>
        </div>`
    }
})

// DISPLAY A SINGLE PRODUCT'S DETAILS 
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
        <h6 id="singleProductTitle">${data.title}</h6>
        <p id="singleProductDescription">${data.description}</p>
        </div>`
    console.log(data)
    })
}

// DELETE A PRODUCT FROM THE CATALOGUE
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

// ADD A NEW PRODUCT TO THE CATALOGUE
const addForm = document.getElementById("addForm")
addForm.addEventListener("submit", function (event){
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const image_url = document.getElementById("image_url").value;
update
    fetch(`http://localhost:3000/PRODUCTS`, {
    method: "POST",
    body: JSON.stringify ({
        title: title,
        description: description,
        image: image_url,
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

// EDIT A PRODUCT FROM THE CATALOGUE
function edit(id){
    fetch(`http://localhost:3000/PRODUCTS/${id}`)
    .then((response)=> response.json())
    .then((res)=> {
        console.log(res);
        const updateContainer = document.getElementById("updateContainer")
        updateContainer.innerHTML=`
        <h2 class="text-white">Update item below:</h2>
        <div>
            <h3> Title: </h3>
            <input type="text" id="update_title" value="${res.title}" placeholder="Enter Title">
            <h3> Description: </h3>
            <input type="text" id="update_description" value="${res.description}" placeholder="Enter description">
            <h3> Image: </h3>
            <input type="text" id="update_image_url" value="${res.image}" placeholder="Enter image url">
            <button onclick="update(${id})" type="submit">UPDATE</button>
        </div>`
    })

}

//UPDATE A PRODUCT IN THE CATALOGUE
function update (id) {

    const update_title = document.getElementById("update_title").value
    const update_description = document.getElementById("update_description").value
    const update_image_url = document.getElementById("update_image_url").value
    
    fetch(`http://localhost:3000/PRODUCTS/${id}`, {
    method: "PATCH",
    body: JSON.stringify ({
        title: update_title,
        description: update_description,
        image: update_image_url
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


//https://product-catalogue-0pt9.onrender.com
