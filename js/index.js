const searchPhone=()=>{
  const phoneDetails=document.getElementById('phone-details');
  phoneDetails.innerHTML='';
    const searchField=document.getElementById('search-phone');
    const searchText=searchField.value;
    console.log(searchText);
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(response=>response.json())
    .then(json=>displaySearchResult(json.data))
    searchField.value='';
}


const displaySearchResult=(phones)=>{
    const resultContainer=document.getElementById('search-result');
    resultContainer.innerHTML='';
    console.log(phones);
    if(phones.length==''){
        document.getElementById('error-message').style.display='block';
    }
    else{
        document.getElementById('error-message').style.display='none';
        if(phones.length>=20||phones.length<20){
            
            resultContainer.innerHTML='';
            const part=phones.slice(0,20);
            part?.forEach(phone=>{
            const div=document.createElement('div');
            div.classList.add('col');
            div.innerHTML=`
            <div class="card h-100 p-3 d-flex flex-column align-items-center">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body d-flex flex-column align-items-start">
              <h5 class="card-title text-info">Phone Name: ${phone.phone_name}</h5>
              <p class="card-text fw-bolder text-info">Brand: ${phone.brand}</p>
              <div class="text-center">
              <button onclick="loadPhoneById('${phone.slug}')" type="button" class="btn btn-primary ">Details</button></div>
            </div>
          </div>
    
            `;
            resultContainer.appendChild(div);
        })
    }
    }
    
}

const loadPhoneById=phoneId=>{
    console.log(phoneId);
    const url=` https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(response=>response.json())
    .then(json=>displayPhoneById(json.data))
}

const displayPhoneById=phone=>{
    console.log(phone);
    const phoneDetails=document.getElementById('phone-details');
    phoneDetails.innerHTML='';
    const div=document.createElement('div');
    div.classList.add('card');
    div.innerHTML=`
    <div class="card h-150 p-3 w-75">
    <img src="${phone.image}" class="card-img-top img-fluid w-25" alt="...">
    <div class="card-body d-flex flex-column align-items-start">
      <p class="card-text fw-bolder text-info">Brand: ${phone.brand}</p>
      <h5 class="card-title text-info">Phone Name: ${phone.name}</h5>
      <p class="card-text fw-bolder text-info">Release Date: ${phone.releaseDate?phone.releaseDate:'Release Date Not Found'}</p>
      <p class="card-text fw-bolder text-info">Storage: ${phone.mainFeatures.storage}</p>
      <p class="card-text fw-bolder text-info">Memory: ${phone.mainFeatures.memory}</p>
      <p class="card-text fw-bolder text-info">Display: ${phone.mainFeatures.displaySize}</p>
      <p class="card-text fw-bolder text-info">Chipset: ${phone.mainFeatures.chipSet}</p>
      <p class="card-text fw-bolder text-info">Sensor: ${phone.mainFeatures.sensors}</p>
      
    </div>
  </div>
    
  
    `;
    phoneDetails.appendChild(div);
 
}