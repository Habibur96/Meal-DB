
document.getElementById('error-message').style.display = 'none';
const searchFood = () => {

    const searchField = document.getElementById('search');
    const searchText = searchField.value;
    // console.log(searchText);

    // Clear Data
    searchText.value = '';
    document.getElementById('error-message').style.display = 'block';
    if (searchText == '') {

        alert('Please write something to display.');
    }
    else {
        // Load Data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`

        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
            // .then(data => console.log(data.meals))
            // .catch(error => console.log(error))
            .catch(error => displayErrorMessage(error))
    }

}

const displayErrorMessage = errorMessage => {
    document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = meals => {
    // console.log(meals)
    const card = document.getElementById('card');
    card.textContent = '';
    if (meals.length == 0) {
        alert('Sorry, result not found.');
    }
    for (const meal of meals) {
        //   console.log(meal)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =
            `<div onclick="loadMealDetail(${meal.idMeal})" class="card">
        <img  src="${meal.strMealThumb} " class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            </div>
    </div>`

        card.appendChild(div)
    }
}

const loadMealDetail = mealId => {
    // console.log(mealId)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal => {
    console.log(meal)
    const mealDetails = document.getElementById('meal-details');

    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML =
        `<div class="card">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
        <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>

    </div>
</div>`

    mealDetails.appendChild(div)

}

