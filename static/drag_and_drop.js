let score = 0

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
    $("#choices").empty()
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
    $("#user_answers").empty()
    answers = user_answers["drag_and_drop"]
    $.each(answers, function(index, value){
        if (value != "Not selected yet"){
            let col = $('<div class="col-md-4"></div>')
            let answer = $('<div class="choice">')
            $(answer).text(value)
            $(answer).attr('id', value)
            $(answer).draggable()
    
            $(col).append(answer)
            $("#user_answers").append(col)
        }
    });
}

function from_choice_to_answer(answer, question) {
    let data_to_change = {"answer": answer, "question": question}
    $.ajax({
        type: "UPDATE",
        url: "/from_choice_to_answer",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data_to_change),
        success:function(result){
            question = result["question"]
            user_answers = result['user_answers']
            possible_choices(question)
            display_answers(user_answers)
        },
        error: function(request, status, error){
            console.log("Error")
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function from_answer_to_choice(answer, question) {
    let data_to_change = {"answer": answer, "question": question}
    $.ajax({
        type: "UPDATE",
        url: "/from_answer_to_choice",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data_to_change),
        success:function(result){
            question = result["question"]
            user_answers = result['user_answers']
            possible_choices(question)
            display_answers(user_answers)
        },
        error: function(request, status, error){
            console.log("Error")
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function update_answers(answer) {
    let data_to_change = {"answer": answer}
    $.ajax({
        type: "UPDATE",
        url: "/update_answers",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data_to_change),
        success:function(result){
            // let question = result["question"]
            user_answers = result['user_answers']
            possible_choices(question)
            display_answers(user_answers)
            // console.log(user_answers["image"])
        },
        error: function(request, status, error){
            console.log("Error")
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function update_score(user_answer, question, option){
    correct_answers = question["ingredients"]
    console.log(correct_answers)
    console.log(user_answer)
    if (correct_answers.includes(user_answer)){
        if (option == "add"){
            score += 1
        }
        else{
            score -= 1
        }
    }
}

$(document).ready(function(){
    console.log("drag and drop reached")
    create_images(question)
    possible_choices(question)

    $('#correct').click(function(){
        $(this).addClass("image_selected")
        $('#wrong').removeClass("image_selected")
        update_answers("correct")
        score += 1
    })
    $('#wrong').click(function(){
        $(this).addClass("image_selected")
        $('#correct').removeClass("image_selected")
        update_answers("wrong")
        if (score > 0){
            score -= 1
        }
    })

    $("#user_answers").droppable({
        drop: function( event, ui ) {
            event.preventDefault();
            let dragged_item = $(ui.draggable).attr("id")
            // console.log(user_answers)
            // update_user_data(dragged_item)
            from_choice_to_answer(dragged_item, question)
            update_score(dragged_item, question, "add")
            // if dynamic updates fail, this works
            // user_answers["drag_and_drop"].push(dragged_item)
            // display_answers(user_answers)
            // $(ui.draggable).remove()
        }
    })

    $("#choices").droppable({
        drop: function( event, ui ) {
            event.preventDefault();
            let dragged_item = $(ui.draggable).attr("id")
            from_answer_to_choice(dragged_item, question)
            update_score(dragged_item, question, "remove")
        }
    })

    $(".check_button").click(function(){
        let image_feedback = ""
        if (user_answers["image"] == "Not selected yet"){
            $("#results").empty()
            image_feedback = $("<div class='incorrect'>Please select image!</div>")
            $("#results").append(image_feedback)
        }
        else if(user_answers["drag_and_drop"].length == 0){
            $("#results").empty()
            $("#error_div").empty()
            dd_feedback = $("<div class='incorrect'>Please drag at least 1 item!</div>")
            $("#error_div").append(dd_feedback)
        }
        else{
            $("#error_div").empty()
            if (user_answers["image"] == 'correct'){
                // score += 1
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
        }
    })
    $(".next_button").click(function(){
        // let id = question["id"]
        let next_id = question["next_question"]
        document.location.href = "/quiz/" + next_id
        console.log("next")
    })

})