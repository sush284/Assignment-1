let HostPlusPort="http://localhost:9191";


function navigate() {
  window.location.assign("quickSearch.html");
}

function activateCheckbox() {
  var x = document.getElementById("cuisineId").style;
  x.display = "inline-block";
  x.position = "absolute";
  x.left = "0.5em";
  x.top = "0.5em";
  x.width = "1.5em";
  x.height = "1.5em";

  window.alert(" activated");
}
function openAddDataDiv() {
var targetDiv = document.getElementById("addData").style;

  
  if(targetDiv.display!=="block")
 {
  targetDiv.display="block";
  console.log(targetDiv.display);

}
 
}

// CLOSING ADD DATA CONTAINER ON CLOSE BUTTON
function closeAddDataSection()
{
var targetDiv = document.getElementById("addData").style;

  if(targetDiv.display!=="none")
  {
    targetDiv.display="none";
    console.log(targetDiv.display);
  }

}

//-------------Getting Data from the form-----------------//

function addDataFromUI() {
  var cuisine = document.getElementById("cuisineType").value;

  if (document.getElementById("breakfast").checked) {
    cuisine = document.getElementById("breakfast").value;
    
  }
  if (document.getElementById("lunch").checked) {
    cuisine = document.getElementById("lunch").value;
    console.log(cuisine);
  }
  if (document.getElementById("dinner").checked) {
    cuisine = document.getElementById("dinner").value;
    console.log(cuisine);
  }

  const foodObject = {
    name: document.getElementById("foodname").value,
    cuisine: cuisine,
    cost: document.getElementById("food-cost").value,
    restaurantName: document.getElementById("restaurantName").value,
    address: document.getElementById("rest-address").value,
    imgUrl: document.getElementById("image-url").value,
  };
  console.log(foodObject);
  const xhttp = new XMLHttpRequest();
  const bodyData = `name=${foodObject.name}
                  &cuisine=${foodObject.cuisine}
                  &cost=${foodObject.cost}
                  &restaurantName=${foodObject.restaurantName}
                  &address=${foodObject.address}
                  &image=${foodObject.imgUrl}`;
 
  xhttp.open('POST',`${HostPlusPort}/getDataFromUI`, true);
  xhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  xhttp.send(bodyData);
  xhttp.onload = (error)=> {
    if(error)
    console.log(error);
    else
    {
    window.alert("Food items added Successfully");
    loadFood();
    }
  }
}

function deleteFood(_id) {
  console.log("Deleted Id is " + _id);
  const xhttp = new XMLHttpRequest();
  const param = "id" + _id;
  xhttp.onload = function () {
    console.log("Food Deleted");
  };
  xhttp.open("DELETE", "http://localhost:9191/deletFood");
  xhttp.send(param);
}

function loadFood()
{
  const xhttp = new XMLHttpRequest();
  //this code is not getting executed but its a self invoking function na
  xhttp.onload = function (req, res) {
    const fromServer = JSON.parse(this.response);
    console.log(fromServer);
    let foodItems = "";
    fromServer.data.forEach((element) => {
      foodItems += `<div class="row">

             <div class="col-md-12">

                <div class="card mb-sm-2 mb-md-2 mb-lg-2 myCard">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3">
                            <input type="checkbox" name="selectedCuisine" id="cuisineId" value="${element._id}" class="form-check-input checkboxClass" style="display:none"/>

                                <figure class="figure">
                                    <img src="${
                                      element.imgUrl || "No URL"
                                    } " class="figure-img img-fluid rounded"
                                        style="width:110px !important;height:110px !important;object-fit: cover !important;"
                                        alt="...">
                                </figure>
                            </div>
                            <div class="col-md-9">
                                <h6 class="h6 text-left fw-semibold">${
                                  element.name || "No Name"
                                }</h6>
                                <h5 class="h5 text-left">${
                                  element.restaurantName || "No Name"
                                }</h5>
                                <p class="">${
                                  element.address || "No Address"
                                }</p>
                            </div>
                        </div>
                        <div class="row border-top">
                            <div class="col-md-3 pt-2">
                                <p class="">CUISINE</p>
                                <p class="">COst For Two</p>
                            </div>
                            <div class="col-md-9 pt-2">
                                <p class="">${
                                  element.cuisine || "No Type Mentioned"
                                }</p>
                                <p class="">Rs ${element.cost || " Nil"}</p>
                              </div>
                        </div>
                    </div>
                </div>
    
    
            </div>
        </div>`;
    });
    /* <button class="btn btn-dark" onclick="deleteFood('${element._id.toString()}')">Delete data</button>*/
    document.querySelector("#itemContainer").innerHTML = foodItems;
  };
  xhttp.open("GET", `${HostPlusPort}/getFood`);
  xhttp.send();
}

//Self Invoking Function