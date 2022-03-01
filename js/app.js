
const searchPhone = () => {
  const searchText = document.getElementById('search-field').value;  
  loadPhone(searchText);

  //clear search field
  document.getElementById('search-field').value = '';
}

const loadPhone = searchText =>{

  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

  fetch(url)
  .then(res => res.json())
  .then(data => displayPhone(data.data))

}

const displayPhone = phones =>{

  if(phones.length ===0){
    document.getElementById('no-results').style.display = 'block';
    }
    else{
      document.getElementById('no-results').style.display = 'none';
    }
  // search result clear
  const phonesContainer = document.getElementById('phones');
  phonesContainer.textContent = '';
//details div clear
  const detailsDiv = document.getElementById('details-div');
  detailsDiv.textContent = '';
  
  const phoneSection = phones.slice(0, 20);
  phoneSection.forEach(phone =>{
    // console.log(phone);
    const div = document.createElement('div');
    div.classList.add("search-result", "col-12", "col-md-4");
    div.innerHTML = `
    <div class="card">
    <img src="${phone.image}" class="card-img-top img-fluid mx-auto mt-1" alt="">
    <div class="card-body">
      <h4>Name: ${phone.phone_name}</h4>
      <h5>Brand: ${phone.brand}</h5>
      <button onclick="loadDetails('${phone.slug}')" class="details-button">Details</button>
    </div>
  </div>
    `;
    phonesContainer.appendChild(div);
  })

  
}

const loadDetails = phoneId =>{
  const url =`https://openapi.programming-hero.com/api/phone/${phoneId}`;
   
  fetch(url)
  .then(res => res.json())
  .then(data => displayDetails(data.data))

}

const displayDetails = details =>{
  // console.log(details);

  const detailsDiv = document.getElementById('details-div');
  detailsDiv.textContent = '';
  const div = document.createElement('div');
  div.classList.add("col-12", "detail-div", "mx-auto",);
  div.innerHTML =`
  <img src="${details.image}" class="img-fluid mb-1" alt="">
  <h3>Name: ${details.name}</h3>
  <h6 class="mb-2">Release Date: ${details.releaseDate ? details.releaseDate  : 'no release date found'}</h6>
  <h5>Main Features:</h5>
  <p><h6 class="d-inline">ChipSet: </h6>${details.mainFeatures.chipSet}</p>
  <p><h6 class="d-inline">Display size: </h6>${details.mainFeatures.displaySize}</p>
  <p><h6 class="d-inline">Memory: </h6> ${details.mainFeatures.memory}</p>
  <p><h6 class="d-inline">Storage: </h6> ${details.mainFeatures.storage}</p>

  <p><h5 class="d-inline">Sensors: </h5> ${details.mainFeatures.sensors.slice(0, 2)}, ${details.mainFeatures.sensors.slice(3, 4)}, ${details.mainFeatures.sensors.slice(4, 5)}, ${details.mainFeatures.sensors.slice(5, 6)}, ${details.mainFeatures.sensors.slice(6, 7)} ${details.mainFeatures.sensors.slice(7, 8)}</p>

  <h5>Others:</h5>
  <p><h6 class="property">Bluetooth: </h6> ${details?.others?.Bluetooth ? details?.others?.Bluetooth : 'no result'}</p>
  <p><h6 class="property">GPS: </h6> ${details?.others?.GPS ? details?.others?.GPS: 'no result'}</p>
  <p><h6 class="property">NFC: </h6> ${details?.others?.NFC ? details?.others?.NFC : 'no result'}</p>
  <p><h6 class="property">Radio: </h6> ${details?.others?.Radio ? details?.others?.Radio : 'no result'}</p>
  <p><h6 class="property">USB: </h6> ${details?.others?.USB ? details?.others?.USB : 'no result'}</p>
  <p><h6 class="property">WLAN: </h6> ${details?.others?.WLAN ? details?.others?.WLAN : 'no result'}</p>
      
  `;
  detailsDiv.appendChild(div);

}