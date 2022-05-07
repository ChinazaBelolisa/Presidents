const APIPath = "https://api.sampleapis.com/presidents/presidents";
const numberOfResults = 9;
const presidentGrid = document.querySelector('#president-grid');
const filterBtn = document.querySelector('#button-addon2');
let presidents = [];

fetch("https://api.sampleapis.com/presidents/presidents")
    .then(response => response.json())
    .then((data) => {
        presidents = data;
        updatePresidents(data);
    });

function updatePresidents(presidents) {
    let allCardsDom = '';
    presidents.forEach((president)=>{
        const cardTemplate = 
            `<div class="col">
                <div class="card">
                    <img src="${president.photo}"
                        class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${president.name}</h5>
                        <p class="card-text">Years In Office: ${president.yearsInOffice}</p>
                    </div>
                </div>
            </div>`;
            allCardsDom +=cardTemplate;
    });
    presidentGrid.innerHTML = allCardsDom;
}

function filterByName() {
    const searchInput = document.querySelector('.form-control').value;
    let filteredArray = [];
    if(searchInput && searchInput.length){
        presidents.forEach((president) => {
            if(president.name.toLowerCase()
                .includes(searchInput.toLowerCase()))
                filteredArray.push(president);
        });
    }else {
        return presidents;
    }
    console.log({searchInput});
    return filteredArray;
}

filterBtn.addEventListener('click',(e)=>{
    console.log('Search button clicked...');
    let filteredList = filterByName();
    updatePresidents(filteredList);
});