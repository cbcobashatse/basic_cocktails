let score = 0

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

function answers_feedback(user_answers, question){
    $("#user_answers").empty()
    answers = user_answers["drag_and_drop"]
    ingredients = question["ingredients"]
    // console.log(ingredients)
    $.each(answers, function(index, value){
        if (value != "Not selected yet"){
            let col = $('<div class="col-md-4"></div>')
            let answer = $('<div class="choice">')
            $(answer).text(value)
            $(answer).attr('id', value)
            $(answer).draggable()

            if(ingredients.indexOf(value) >= 0){
                $(answer).removeClass("incorrect")
                $(answer).addClass("correct")
            }
            else{
                $(answer).removeClass("correct")
                $(answer).addClass("incorrect")
            }
    
            $(col).append(answer)
            $("#user_answers").append(col)
        }
    });
}

function choices_feedback(user_answers, question){
    $("#choices").empty()
    choices = question["choices"]
    ingredients = question["ingredients"]
    // console.log(ingredients)
    $.each(choices, function(index, value){
        // if (value != "Not selected yet"){

        if (user_answers["drag_and_drop"].indexOf(value) < 0){
            let col = $('<div class="col-md-4"></div>')
            let choice = $('<div class="choice">')
            $(choice).text(value)
            $(choice).attr('id', value)
            $(choice).draggable()

            if(ingredients.indexOf(value) >= 0){
                $(choice).removeClass("incorrect")
                $(choice).addClass("correct")
            }
            else{
                $(choice).removeClass("correct")
                $(choice).addClass("incorrect")
            }

            $(col).append(choice)
            $("#choices").append(col)
        }
        // }
    });
}

function from_choice_to_answer(answer, question) {
    //add
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
            score = result['user_answers']['score']
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
    //remove
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
            score = result['user_answers']['score']
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

function question_answered(question_no) {
    let data_to_change = {"question_no": question_no}
    $.ajax({
        type: "UPDATE",
        url: "/answered",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data_to_change),
        success:function(result){
            user_answers = result['user_answers']
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

// function update_answers(answer) {
//     let data_to_change = {"answer": answer}
//     $.ajax({
//         type: "UPDATE",
//         url: "/update_answers",
//         dataType: "json",
//         contentType: "application/json; charset=utf-8",
//         data: JSON.stringify(data_to_change),
//         success:function(result){
//             // let question = result["question"]
//             user_answers = result['user_answers']
//             score = result['user_answers']['score']
//             possible_choices(question)
//             display_answers(user_answers)
//             // console.log(user_answers["image"])
//         },
//         error: function(request, status, error){
//             console.log("Error")
//             console.log(request)
//             console.log(status)
//             console.log(error)
//         }
//     });
// }

// function update_score(user_answer, question, option){
//     correct_answers = question["ingredients"]
//     console.log(correct_answers)
//     console.log(user_answer)
//     if (correct_answers.includes(user_answer)){
//         if (option == "add"){
//             score += 1
//         }
//         else{
//             score -= 1
//         }
//     
// }

function fill_in_answers(user_answers, question){
    dd_answers = user_answers['drag_and_drop']
    if (dd_answers.length > 0){
        console.log("doing it")
        $("#feedback_div").empty()
        let results = $("<div>Correct answers in Green, Incorrect answers in Red!</div>")
        $(results).css("font-family", "Gill Sans")
        $("#feedback_div").append(results)
        $("#score").html(user_answers['score'] + "/" + question["max_score"]).css("font-weight", "bold").css("font-family", "Gill Sans")
        answers_feedback(user_answers, question)
        choices_feedback(user_answers, question)

        //replacing the check button with the next button
        $('#check_next_button').removeClass("check_button")
        $('#check_next_button').addClass("next_button")
        $('#check_next_button').text("Next Question")

        //disable drag and drop option after the check
        $('.choice').draggable({
            disabled: true
        });

        $(".next_button").click(function(){
            // let id = question["id"]
            let next_id = question["next_question"]
            document.location.href = "/quiz/" + next_id
            console.log("next")
        })
    }
}

$(document).ready(function(){
    possible_choices(question)
    display_answers(user_answers)
    fill_in_answers(user_answers, question)

    $('.next_button').click(function(){
        $(".next_feedback").empty()
        next_feedback = $("<div class='incorrect'>Please answer the question!</div>")
        $('.next_feedback').append(next_feedback)
    })

    $('.prev_button').click(function(){
        let id = parseInt(question["id"]) - 1
        document.location.href = "/quiz/" + id
    })

    $("#user_answers").droppable({
        drop: function( event, ui ) {
            event.preventDefault();
            let dragged_item = $(ui.draggable).attr("id")
            // console.log(user_answers)
            // update_user_data(dragged_item)
            from_choice_to_answer(dragged_item, question)
            // update_score(dragged_item, question, "add")
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
            // update_score(dragged_item, question, "remove")
        }
    })

    $(".check_button").click(function(){
        if(user_answers["drag_and_drop"].length == 0){
            $("#feedback_div").empty()
            let dd_feedback = $("<div class='incorrect'>Please drag at least 1 item!</div>")
            $("#feedback_div").append(dd_feedback)
        }
        else{
            $("#feedback_div").empty()
            let results = $("<div>Correct answers in Green, Incorrect answers in Red!</div>")
            $("#feedback_div").append(results)
            $("#score").html(score + "/" + question["max_score"]).css("font-weight", "bold").css("font-family", "Gill Sans")
            answers_feedback(user_answers, question)
            console.log(question["choices"])
            choices_feedback(user_answers, question)
            console.log(user_answers)

            //replacing the check button with the next button
            $('#check_next_button').removeClass("check_button")
            $('#check_next_button').addClass("next_button")
            $('#check_next_button').text("Next Question")

            //disable drag and drop option after the check
            $('.choice').draggable({
                disabled: true
            });

            question_answered("2")
        }

        $(".next_button").click(function(){
            // let id = question["id"]
            let next_id = question["next_question"]
            document.location.href = "/quiz/" + next_id
            console.log("next")
        })
    })

})