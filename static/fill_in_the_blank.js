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

function make_quiz(){
    let lines = question["lines"]
    let input_id=1
	$.each(lines, function(index, value){
        let visible_text = lines[index]["visible_text"]
        let input_box = $("<input class='fill_in_answer' type='text'></input>")
        input_box.attr("id", input_id)
        input_box.keypress(function(e){
            if(e.which==13){
                check_answers()
            }
        })

        let hint_div = $("<div class='hint'>" + visible_text + "</div>")
        let row_div = $("<div></div>")

        if(lines[index]["blank_alignment"]=="before"){
            row_div.append(input_box)
            row_div.append(hint_div)
        }

        else{
            row_div.append(hint_div)
            row_div.append(input_box)
        }

        $(".fill_in_questions").append(row_div)
        $(".fill_in_questions").append("<br>")

        input_id = input_id + 1
    })

    $(".score").html("_ /" + question["max_score"])

    $(".check_button").click(function(){
        check_answers()
    })
}

function make_other_quiz_buttons(){
    let count = 0
    let row = $("<div class='row'></div>")
    $.each(cocktails, function(index, value){
        let name = cocktails[index]["title"]
        if(name != question["title"]){
            if(count %2 == 0 && count > 0){
                $(".other_buttons").append(row)
                row = $("<div class='row'></div>")
            }
            let button = $("<div class='col-md-6'><button class='other_quiz_button'>" + name + " Quiz" + "</button></div>")
            row.append(button)
            $(button).click(function(){
                // routine to bring back to score to 0
                reset_score()

                console.log("changed scores")

                // changed the formula to account for the change in the data structure
                let id = 3*(parseInt(cocktails[index]["id"])) - 2
                document.location.href = "/quiz/" + id
            })
        }
    })
    $(".other_buttons").append(row)
}

function check_answers(){
    $(".error").empty()
    $(".correct").empty()
    $(".incorrect").empty()
    let score = 0
    let error = 0
    $(".fill_in_answer").each(function(){
        let id = $(this).attr("id")
        if($(this).val()==""){
            error = 1
            let error_msg = $("<div class='col-md-12 error'>Please enter an answer</div>")
            $(this).parent().append(error_msg)
        }

        else if(!($.isNumeric($(this).val())) && question["lines"][id]["answer_type"]=="numeric"){
            error = 1
            let error_msg = $("<div class='col-md-12 error'>Please enter a numerical value</div>")
            $(this).parent().append(error_msg)
        }
        else if($.isNumeric($(this).val()) && question["lines"][id]["answer_type"]=="text"){
            error = 1
            let error_msg = $("<div class='col-md-12 error'>Please enter a non-numerical value</div>")
            $(this).parent().append(error_msg)
        }

    })
    if(error != 1){
        $(".fill_in_answer").each(function(){
            let val = $(this).val().toLowerCase()
            let id = $(this).attr("id")
            let answer = question["lines"][id]["answer"]
            if(val == answer.toLowerCase()){
                score = score + 1
                let feedback = $("<div class='correct'>Correct</div>")
                $(this).parent().append(feedback)
            }
            else{
                let feedback = $("<div class='incorrect'>" + "Incorrect." + " Correct answer: " + answer + "</div>")
                $(this).parent().append(feedback)
            }

            $(this).attr("disabled", "disabled")
        })

        new_score = score + parseInt(user_answers['score'])

        $(".score").html(new_score + "/" + question["max_score"]).css("font-weight", "bold")
    }
}

$(document).ready(function(){
    make_quiz()
    make_other_quiz_buttons()

    $(".quiz_home_button").click(function(){
        document.location.href = "/quiz"
    })

    $(".back_button").click(function(){
        let id = parseInt(question["id"]) - 1
        document.location.href = "/quiz/" + id
    })

    $(".retry_button").click(function(){
        // location.reload(true)
        reset_score()

        let id = parseInt(question["id"]) - 2
        document.location.href = "/quiz/" + id
        
    })
})
