let user_answers = {"image": "", "drag_and_drop": []}

function create_images(question) {
    // let question_id = question['id']
    // let cocktail_id = (parseInt(question_id) + 1) / 2
    let altText = "alt_text"

    let random_num = Math.floor((Math.random() * 2) + 1);
    
    let col_1 = $('<div class="col-md-6"></div>')
    let col_2 = $('<div class="col-md-6"></div>')

    correct_image = question["correct_image"]
    wrong_image = question["wrong_image"]

    correct = "<img id='correct' class='dd_image' src='"+correct_image+"'"+" alt='"+altText+"'>"
    wrong = "<img id='wrong' class='dd_image' src='"+wrong_image+"'"+" alt='"+altText + "'>"

    if (random_num == 1){
        $(col_1).append(correct)
        $(col_2).append(wrong)
    }
    else{
        $(col_2).append(correct)
        $(col_1).append(wrong)
    }
    $("#images_div").append(col_1)
    $("#images_div").append(col_2) 
    console.log("done")
}

function possible_choices(question) {
    choices = question["choices"]
    $.each(choices, function(index, value){
        let col = $('<div class="col-md-4"></div>')
        let choice = $('<div class="choice">')
        $(choice).text(value)
        $(choice).attr('id', value)
        $(choice).draggable()

        $(col).append(choice)
        $("#choices").append(col)
    });
}

function display_answers(user_answers){
    console.log("called")
    $("#user_answers").empty()
    answers = user_answers["drag_and_drop"]
    $.each(answers, function(index, value){
        let col = $('<div class="col-md-4"></div>')
        let answer = $('<div class="choice">')
        $(answer).text(value)
        $(answer).attr('id', value)
        $(answer).draggable()

        $(col).append(answer)
        $("#user_answers").append(col)
    });
}

function delete_choice(choice, question) {
    let data_to_delete = {"choice": choice, "question": question}
    // console.log(choice)
    // console.log(question)
    // console.log("works")
    $.ajax({
        type: "UPDATE",
        url: "delete_choice",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data_to_delete),
        success:function(result){
            let question = result["question"]
            possible_choices(question)
        },
        error: function(request, status, error){
            console.log("Error")
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

// function add_choice(choice, question) {
//     let data_to_delete = {"choice": choice, "question": question}
//     $.ajax({
//         type: "POST",
//         url: "add_choice",
//         dataType: "json",
//         contentType: "application/json; charset=utf-8",
//         data: JSON.stringify(data_to_delete),
//         success:function(result){
//             let question = result["question"]
//             possible_choices(question)
//         },
//         error: function(request, status, error){
//             console.log("Error")
//             console.log(request)
//             console.log(status)
//             console.log(error)
//         }
//     });
// }

$(document).ready(function(){
    console.log("drag and drop reached")
    create_images(question)
    possible_choices(question)

    $('#correct').click(function(){
        $(this).addClass("image_selected")
        $('#wrong').removeClass("image_selected")
        user_answers["image"] = "correct"
    })
    $('#wrong').click(function(){
        $(this).addClass("image_selected")
        $('#correct').removeClass("image_selected")
        user_answers["image"] = "wrong"
    })

    $("#user_answers").droppable({
        drop: function( event, ui ) {
            event.preventDefault();
            // ui.draggable()
            let dragged_item = $(ui.draggable).attr("id")
            // update_user_data(dragged_item)
            // delete_choice(dragged_item, question)

            // if dynamic updates fail, this works
            user_answers["drag_and_drop"].push(dragged_item)
            display_answers(user_answers)
            $(ui.draggable).remove()
        }
    })

    $(".check_button").click(function(){
        let score = 0
        let image_feedback = ""
        if (user_answers["image"] == 'correct'){
            score += 1
            $("#results").empty()
            image_feedback = $("<div class='correct'>Correct image!</div>")
        }
        else{
            $("#results").empty()
            image_feedback = $("<div class='incorrect'>Incorrect image!</div>")
        }
        $("#results").append(image_feedback)
        $(".score").html(score + "/" + question["max_score"]).css("font-weight", "bold")
        console.log(user_answers)
    })

})