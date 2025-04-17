const serviceData = () => fetch("https://testing-8az5.onrender.com/services/")
.then(response=>response.json())
.then(data=>getServiceData(data))



const getServiceData = (services) => {
    // console.log(services)
    services.forEach(element => {
        // console.log(element)
        const babaDiv = document.getElementById('service-container');
        let li = document.createElement('li');
        // slide visible na korle image gula blur/non-visible thakbe
        li.classList.add('slide-visible');
        li.innerHTML = `
            <li class="">
                  <div class="card shadow h-100">
                      <div class="ratio ratio-16x9">
                          <img src="${element.image}" class="card-img-top" loading="lazy" alt="...">
                      </div>
                      <div class="card-body p-3 p-xl-5">
                          <h3 class="card-title h5">${element.name}</h3>
                          <p class="card-text">${element.description.slice(0, 100)}...</p>
                          <div><a href="#" class="btn btn-primary">View Details</a>
                          </div>
                      </div>
                  </div>
            </li>
        `;

        babaDiv.appendChild(li);
    });
}




// ? optional chaining error handle korte use kora hoi
const getDoctor = (value) => {
    // console.log(value)
    document.getElementById("card-doc").innerHTML = ""; // data load korar age jeno box clear hoye jai
    const s = document.getElementById("spinner")
    if (s){
        document.getElementById("spinner").style.display = "block";
    }
    fetch(`https://testing-8az5.onrender.com/doctor/list/?search=${value ? value : ""}`)// hoi value hobe nahole empty string hobe
    .then(response => response.json())
    .then(data => {
        // doctorDetails(data?.results);
        console.log(data.results)
        if(data.results.length > 0)
        {
            const  s = document.getElementById("spinner")
            const  n = document.getElementById("nodata")
            if(n && s){
                document.getElementById("spinner").style.display = "none";
                document.getElementById("nodata").style.display = "none";
                doctorDetails(data?.results);
            }
        }
        else
        {
            const  s = document.getElementById("spinner")
            const  n = document.getElementById("nodata")
            if(n && s){
                document.getElementById("card-doc").innerHTML = "";
                document.getElementById("spinner").style.display = "none";
                document.getElementById("nodata").style.display = "block";
            }

        }
        
    });
}



const doctorDetails = (result) => {
    console.log(result)
    result.forEach((data) => {
        console.log(data)
        const parent = document.getElementById("card-doc")
        let div = document.createElement("div")
        div.classList.add("card", "m-3", "shadow-lg", "rounded-5","bg-body-secondary", "border-0", "custom-doc-card")
        div.innerHTML = `
            <div class="img-wrapper d-flex justify-content-center">
                <img src="${data.image}" class="card-img-top img-fluid p-3" alt="...">
            </div>
            <div class="card-body pt-0">
                <h5 class="card-title">${data.full_name}</h5>
                ${data.specialization.map(x => {
                    return `<a href='#' class='bg-warning p-1 text-black rounded-2  text-decoration-none btn-sm ms-2'>${x}</a>`
                } )}
                <br>
                <a href="#" class="btn btn-primary mx-auto btn-sm mt-2">Details</a>
            </div>
        `;
        parent.appendChild(div);
    })
}



const doctorDesignation = () => {
    fetch("https://testing-8az5.onrender.com/doctor/designation/")
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        data.forEach((item) => {
            // console.log(item.name);
            const parent = document.getElementById("drop-desig");
            let li = document.createElement("li");
            li.classList.add("dropdown-item");
            li.innerHTML = `
            <li onclick="getDoctor('${item?.name}')">${item?.name}</li>
            `;
            parent.appendChild(li);
        })
    })
}
const doctorSpecialization = () => {
    fetch("https://testing-8az5.onrender.com/doctor/specialization/")
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        data.forEach((item) => {
            // console.log(item.name);
            const parent = document.getElementById("drop-spe");
            let li = document.createElement("li");
            li.classList.add("dropdown-item");
            // li die doctor filter hoye jabe tai ekhaen function k call kora holo
            li.innerHTML = `
                <li onclick="getDoctor('${item?.name}')">${item?.name}</li>
            `;
            parent.appendChild(li);
        })
    })
}



// search doctor
const searchDoctor = () => {
    const value = document.getElementById("searchBox").value;
    // console.log(value);
    getDoctor(value);
}






doctorSpecialization()
doctorDesignation()

serviceData()