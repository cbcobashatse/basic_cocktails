
function create_card(cocktail){
    let curCocktail = cocktail
    let title = curCocktail["title"]
    let ingredients = curCocktail['ingredients']
    let image = curCocktail["image"]
    front.innerHTML = "<img src='"+image+"' width= '300'>";
    back.innerHTML = ingredients;
    back.style.visibility = "hidden";

}

function flash() {
    if (front.style.visibility != "hidden") {
      front.style.visibility = "hidden";
      back.style.visibility = "visible";
    } else {
      front.style.visibility = "visible";
      back.style.visibility = "hidden";
    }
  }
$(document).ready(function(){
    var front = document.getElementById("front");
    var back = document.getElementById("back");
    var flip = document.getElementById("flip");
    create_card(cocktail)
})


