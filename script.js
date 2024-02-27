// Call Meal Category
getCategory();

// List Print
async function getList(url,type){
	var requestUrl = url;
	var favArr=JSON.parse(localStorage.getItem("favouritesList"));
	const urlResponse = await fetch(requestUrl);
    const items = await urlResponse.json();
    
    var itemValue = '';
    var isCat = false;
    let attr = '';
    let itemImg = '';
    let itemName = '';
    if(type == "cat"){
    	isCat = true;
		itemValue = items.categories;
    }else{
    	itemValue = items.meals;
    }
    let html = '';
    if(itemValue != null){
    	html += `<ul>`;
	    itemValue.forEach((item) => {
	    let isFav=false;
	    if(isCat){
	    	attr = "data_catItem="+item.strCategory;
	    	itemImg = item.strCategoryThumb;
	    	itemName = item.strCategory;
	    }else{
	    	attr = "data_id="+item.idMeal;
	    	itemImg = item.strMealThumb;
	    	itemName = item.strMeal;
	    	
	    	for (let i = 0; i < favArr.length; i++) {
	            if(favArr[i]==item.idMeal){
	                isFav=true;
	            }
	        }
	    }
	    html += `<li>
						<div class="productCard">
							<a href="javaScript:void(0);" ${attr} title="${itemName}">
								<div class="productImg">
									<img src="${itemImg}" alt="${itemName}">
								</div>
							</a>
							<div class="productContent ${isCat?'':'mealList'}">
								<div class="title">${itemName}</div>
								${isCat?''
									:
									`<div class="actionBtn">
										<span class="wishlistBtn ${isFav?'active':''}" title="Add to wishlist" ${attr} onclick="favMealAddRemove(${item.idMeal})">
											<svg xmlns="http://www.w3.org/2000/svg" width="16.194" height="14.985" viewBox="0 0 16.194 14.985">
											<path d="M11.829,39.221a4.128,4.128,0,0,0-3.415,1.9c-.118.166-.224.331-.317.492-.093-.161-.2-.326-.317-.492a4.128,4.128,0,0,0-3.415-1.9C1.82,39.221,0,41.549,0,44.343c0,3.195,2.4,6.206,7.769,9.762a.587.587,0,0,0,.656,0c5.373-3.557,7.769-6.568,7.769-9.762C16.194,41.551,14.375,39.221,11.829,39.221Zm1.428,9.1A24,24,0,0,1,8.1,52.7a24,24,0,0,1-5.16-4.383,6.283,6.283,0,0,1-1.671-3.978c0-2.012,1.244-3.74,3.1-3.74A2.891,2.891,0,0,1,6.76,41.938a5.312,5.312,0,0,1,.734,1.445.618.618,0,0,0,1.208,0,5.308,5.308,0,0,1,.711-1.413A2.9,2.9,0,0,1,11.829,40.6c1.857,0,3.1,1.73,3.1,3.74A6.283,6.283,0,0,1,13.257,48.321Z" transform="translate(0 -39.221)" fill="#1c1d1b"></path>
											</svg>
										</span>
									</div>`}
							</div>
						</div>
					</li>`;
		});
		html += `</ul>`;
	}else{
    	html = `<div class="errorDiv">
    				<div>
	    				<div class="mailErrorDiv">404</div>
	    				<div class="errorText">Oops! Meal Not Found</div>
	    			</div>
    			</div>`;
    }
	document.getElementById("plist").innerHTML = html;
	setTimeout(() => {
		if(type == "cat"){
			// Get meal accroding to category
			let catItem = document.querySelectorAll(".productCard a");
			catItem.forEach(function (i) {
				i.addEventListener("click", function(){
					var catId = this.getAttribute('data_catItem');
					getMealList(catId);
				});
			});
		}else{
			// Redirect to detail page
		    let menuItem = document.querySelectorAll(".productCard a");
			menuItem.forEach(function (i) {
				i.addEventListener("click", function(){
					var mealId = this.getAttribute('data_id');
					window.location = `detail.html?id=${mealId}`;
				});
			});
		}
	}, 1000);
}

// Meal Category Function
function getCategory(){
	document.getElementById("mainTitle").innerHTML = "Meal Category";
	document.getElementById("back").style.display = 'none';
	var carUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";
	getList(carUrl,"cat");
}

// Meal List Function Based on Category
function getMealList(item){
	document.getElementById("mainTitle").innerHTML = item;
	document.getElementById("back").style.display = 'block'; 
	var catItemUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${item}`;
	getList(catItemUrl,"");	
}

// Get Meal List accroding to search
let input = document.getElementById("search");
input.addEventListener('keyup', (e) => {
  	var inputVal = e.target.value;
	if(inputVal.length>0){
		document.getElementById("mainTitle").innerHTML = "Search result for "+inputVal;
		document.getElementById("back").style.display = 'block';
		var searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputVal}`;
		getList(searchUrl,"");
	}else{
		getCategory();
	}
});


// back btn
var backBtn = document.getElementById("back");
backBtn.addEventListener("click", function(){
	getCategory();
	document.getElementById("search").value="";
});
