// wishlist show and hide
var wishlistHeaderIcon = document.getElementById("wishlistIcon");
wishlistHeaderIcon.addEventListener("click", function(){
	document.getElementById('wishlistBox').classList.add('show');
});
var wishlistCloseIcon = document.getElementById("closeWishList");
wishlistCloseIcon.addEventListener("click", function(){
	document.getElementById('wishlistBox').classList.remove('show');
});


// it makes a favourites meal array if its not exist in local storage
if (localStorage.getItem("favouritesList") == null) {
    localStorage.setItem("favouritesList", JSON.stringify([]));
}else{
	showFavMeal();
}

// Add and remove meal item from wishlist
function favMealAddRemove(id){
	let arr=JSON.parse(localStorage.getItem("favouritesList"));
	let contain=false;
    for (let index = 0; index < arr.length; index++) {
        if (id==arr[index]) {
            contain=true;
        }
    }
    if (contain) {
        let number = arr.indexOf(id);
        arr.splice(number, 1);
        alert("your meal removed from your favourites list");
    } else {
        arr.push(id);
        alert("your meal add your favourites list");
    }
    localStorage.setItem("favouritesList",JSON.stringify(arr));
    showFavMeal();
}

// Shpw fav meal item in wishlistbox
function showFavMeal(){
	let favArrMeal=JSON.parse(localStorage.getItem("favouritesList"));
	document.getElementById("count").innerHTML = favArrMeal.length;
	document.getElementById("favDiv").innerHTML = '';
    if (favArrMeal.length != 0){
    	document.getElementById("blankFav").innerHTML = '';
    	for (let i = 0; i < favArrMeal.length; i++) {
			printFavMeal(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favArrMeal[i]}`); 
		}
		setTimeout(() => {
			// Remove Fav meal from list
			let removeFavMealBtn = document.querySelectorAll(".removeFav");
			removeFavMealBtn.forEach(function (i) {
				i.addEventListener("click", function(){
					var favMealId = this.getAttribute('data_id');
					favMealAddRemove(favMealId);
				});
			});

			// Remove Fav meal from list

			let favDetailDIv = document.querySelectorAll(".wlLeft");
			favDetailDIv.forEach(function (i) {
				i.addEventListener("click", function(){
					var favmealId = this.getAttribute('data_id');
					window.location = `detail.html?id=${favmealId}`;
				});
			});
		},1000)      
    }else{
    	var emptyHtml = `<div class="wishListerrorDiv">
    						<div>
			    				<div class="mailErrorDiv">404</div>
			    				<div class="errorText">Oops! No meal added in your favourites list</div>
		    				</div>
		    			</div>`;
    	document.getElementById("blankFav").innerHTML = emptyHtml;
    }
}

// print fav meal in wishlistbox
async function printFavMeal(requestUrl){
	const urlResponse = await fetch(requestUrl);
    const items = await urlResponse.json();
    let favHtml = '';
    var favItem = items.meals[0];
    favHtml = `<li>
					<div class="wlLeft" data_id=${favItem.idMeal}>
						<div class="wiImg">
							<img src="${favItem.strMealThumb}" alt="${favItem.strMeal}">
						</div>
						<div class="wiCon">
							<div class="wltitle">${favItem.strMeal}</div>
							<span class="wlcat">${favItem.strCategory}</span>
						</div>
					</div>
					<div class="wlRight">
						<div class="btn-close removeFav" data_id=${favItem.idMeal}></div>
					</div>	
				</li>`;
	document.getElementById("favDiv").innerHTML += favHtml;
}


