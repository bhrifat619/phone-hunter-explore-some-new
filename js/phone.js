let loadData = async (searchText, dataLimit) => {
    let url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    let res = await fetch(url);
    let data = await res.json();
    displayData(data.data, dataLimit);
}
let displayData = (mainData, dataLimit) => {
    console.log(mainData)
    // console.log(mainData.data);
    let phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';
    // this is not a perfect way . amra jodi 10 ta dekhate cai tahole amader database theke 10 ta i load kora uchit
    // handle showall button
    let showButton = document.getElementById('show-all');
    if (dataLimit && mainData.length > 10) {
        // show 10 phones only
        mainData = mainData.slice(0, 10); // starts from 0 ends in 20
        showButton.classList.remove('d-none');
    }
    else {
        showButton.classList.add('d-none');
    }



    let noPhone = document.getElementById('no-phone');
    if (mainData.length === 0) {
        noPhone.classList.remove('d-none');
        loader(false) // stop speaner / loader
    }
    else {
        noPhone.classList.add('d-none');
        loader(true)
    }

    mainData.forEach(phone => {
        console.log(phone);
        let phoneDiv = document.createElement('div');
        phoneDiv.innerHTML = `
        <div class="col">
            <div class="card p-3">
                <img src=${phone.image} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit longer.</p>
                </div>
                <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadDetail('${phone.slug}')" class="btn btn-primary">See more details</button>
                
               
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    loader(false)
}

let processSearch = (dataLimit) => {
    loader(true);
    let searchValue = document.getElementById('search-field').value;
    console.log(searchValue);
    loadData(searchValue, dataLimit);
    // document.getElementById('search-field').value = '';

}
let button = document.getElementById('btn-search');
button.addEventListener('click', function () {
    processSearch(10);
    /* loader(true);
    let searchValue = document.getElementById('search-field').value;
    console.log(searchValue);
    loadData(searchValue);
    document.getElementById('search-field').value = ''; */
})
// input enter key
// the enter is happend in input field so the id will be input field id
document.getElementById('search-field').addEventListener('keypress', function (e) {
    console.log(e.key) // the key means which key we are pressing
    if (e.key === 'Enter') { 
        processSearch(10);
    }
});
// loader function 
let loader = isLoading => {
    let loaderId = document.getElementById('loader');
    if (isLoading) {
        loaderId.classList.remove('d-none');
    }
    else {
        loaderId.classList.add('d-none');
    }
}


// show more detail in every card
let loadDetail = async id => {
    let url = `https://openapi.programming-hero.com/api/phone/${id}`;
    let res = await fetch(url);
    let data = await res.json();
    displayModal(data.data);
}
// display data
let displayModal = modalData => {
    console.log(modalData)
    let title = document.getElementById('exampleModalLabel');
    title.innerText = modalData.name;
    let modalBody =document.getElementById('modal-body');
    modalBody.innerHTML=`
        <img src=${modalData.image}>
        <h4>Name: ${modalData.name}</h4>
        <h6>Brand: ${modalData.brand}</h6>
                                        <!-- release jodi thake tahole dekhaw nahole string ta dekhao -->
        <h6>Release Date: ${modalData.releaseDate ? modalData.releaseDate : 'Release date not found'}</h6>
        <h6>Storage: ${modalData.mainFeatures.storage ? modalData.mainFeatures.storage : 'Storage is not available right now'}</h6>
        <h6>Display Size: ${modalData.mainFeatures.displaySize}</h6>
        <h6>Memory: ${modalData.mainFeatures.memory ? modalData.mainFeatures.memory : 'No memory'}</h6>
        <h6>Processor: ${modalData.mainFeatures.chipSet}</h6>
        <p class="text-primary-emphasis">Price: Isn't available right now, save it for further information..</p>

    `

}

// not the best way to load show all
// show all e click korle amra full data take abar load korbo
document.getElementById('btn-showall').addEventListener('click', function () {
    processSearch()
})
// loadDetail()


// things we have to know about fetch
/* 
Fetch
 1. fetch must provide url(dynamic or static)
 2. how to convert fetch promise return to json (.json())
 3. how to convert json to data
 4. [cool headed] : how to extract data from fetch api
===============
Dom manipulation
 1. get something from dom
 2. create element to append to the dom
 3. dynamically load data based on id
===============
array --> foreach, map, find, filter
===============
template string (``)


*/