
function create_link(cocktail) {
    
    let curCocktail = cocktail
    let title = curCocktail["title"]
    let image = curCocktail["image"]
    let altText = curCocktail["alt_text"]
    let col = $('<div class="col-md-4"></div>')


    //adjust width NEW 
    let cardContainer = $('<div class="card text-center"> </div>')
    let cardBody = $('<div class="card-body"> </div>')
    let cardText = $('<p class="card-text"> </p>')
    $(cardText).text(title)
    $(cardBody).append(cardText)
    
    let content = $("<a href='/learn/" + curCocktail['id'] + "'><img class = 'card-img-top' src='"+image+"'"+" alt='"+altText+"'" + " width= '100%'></a");
    
    //NEW 
    $(cardContainer).append(content)
    $(cardContainer).append(cardBody)
    $(cardContainer).addClass("cards")
    $(col).append(cardContainer)
    $("#cocktail-list-div").append(col) 

}

$(document).ready(function(){
    console.log("learn page reached")
	create_link(cocktails["1"])
	create_link(cocktails["2"])
	create_link(cocktails["3"])
})
