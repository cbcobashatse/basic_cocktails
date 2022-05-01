// $(document).ready(function(){
//     console.log("quiz page reached")
// })

function create_link(cocktail) {
    
    let curCocktail = cocktail
    let title = curCocktail["title"]
    let altText = curCocktail["alt_text"]
    let col = $('<div class="col-md-4"></div>')

    //adjust width NEW
    let cardContainer = $('<div class="card text-center"> </div>')
    let cardBody = $('<div class="card-body"> </div>')
    let cardTitle = $('<div class="quiz_card_title card-title">' + title + "</div>")
    let cardText = $('<p class="card-text">Test your knowledge on how to make a ' + title + ' cocktail</p>')
    $(cardBody).append(cardTitle)
    $(cardBody).append(cardText)

    quiz_id = (curCocktail['id'] * 3) - 2
    // console.log(quiz_id)
    
    let button = $('<button class="btn take_quiz_button">Take Quiz</button>' )
    
    $(button).click(function(){
        document.location.href = "/quiz/" + quiz_id
    })
    
    //NEW 
    $(cardContainer).append(cardBody)
    $(cardContainer).append(button)
    $(col).append(cardContainer)
    $("#cocktail-list-div").append(col) 

}

$(document).ready(function(){
    console.log("quiz page reached")
    $.each(cocktails, function(index, value){
        create_link(cocktails[index])
    })
	
})
