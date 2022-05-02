// $(document).ready(function(){
//     console.log("quiz page reached")
// })

function reset_score() {
    // let data_to_change = {"answer": answer}
    $.ajax({
        type: "UPDATE",
        url: "/reset_score",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        // data: JSON.stringify(data_to_change),
        success:function(result){
            user_answers = result['user_answers']
            question = result['question']
            score = result['user_answers']["score"]
        },
        error: function(request, status, error){
            console.log("Error")
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

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
    let cardImg = "<img class='card-img-top' src='"+curCocktail["quiz_home_image"]+"'"+" alt='"+curCocktail["quiz_home_alt_text"]+"'>"
    $(cardBody).append(cardTitle)
    $(cardBody).append(cardText)

    quiz_id = (curCocktail['id'] * 3) - 2

    // console.log(quiz_id)
    
    let button = $('<button class="btn take_quiz_button">Take Quiz</button>')
    $(button).attr("id", quiz_id)
    $(button).click(function(){
        reset_score()
        document.location.href = "/quiz/" + $(this).attr("id")
    })

    
    //NEW 
    $(cardContainer.append(cardImg))
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
