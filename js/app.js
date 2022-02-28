
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
  const phonesContainer = document.getElementById('phones');
  phones.forEach(phone =>{
    console.log(phone);
    const div = document.createElement('div');
    div.classList.add('search-result')
    div.innerHTML = `
    <div class="card">
    <img src="${phone.image}" class="card-img-top w-75 img-fluid mx-auto" alt="">
    <div class="card-body">
      <h4>Name: ${phone.phone_name}</h4>
      <h5>Brand: ${phone.brand}</h5>
      <button>Details</button>
    </div>
  </div>
    `;
    phonesContainer.appendChild(div);
  })
  
}