// Get Id From URL
const url = new URLSearchParams(window.location.search);
const mealId = url.get('id');

// Call Meal Detail Function
mealDetail(mealId);

// Meal Detail Function
async function mealDetail(id){
	const mealUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
	const mealResponse = await fetch(mealUrl);
    const mealdetail = await mealResponse.json();
    let html = '';
    mealdetail.meals.forEach((item,i) => {
    	html = `<div class="pdLeft">
						<div class="productImg">
							<img src="${item.strMealThumb}" alt="${item.strMeal}">
						</div>
					</div>
					<div class="pdRight">
						<span class="catName">${item.strCategory}</span>
						<div class="pName">${item.strMeal}</div>
						<div class="para">
							<p>${item.strInstructions}</p>
						</div>
					</div>`;
    });
    document.getElementById("productDetailBox").innerHTML = html;
}

// Go Back
var backBtn = document.getElementById("goBack");
backBtn.addEventListener("click", function(){
	window.location = 'index.html';
});