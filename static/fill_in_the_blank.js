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

function update_fill_in_the_blank(ids, user_values, correctness) {
    // let score = 0
    let data_to_change = {"ids": ids, "user_values": user_values, "correctness": correctness}
    $.ajax({
        type: "UPDATE",
        url: "/update_fill_in_the_blank",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data_to_change),
        success:function(result){
            user_answers = result['user_answers']
            score = result["score"]
            // console.log(score)
        },
        error: function(request, status, error){
            console.log("Error")
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
    // console.log(score)
    // return score
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
            let error_msg = $("<div class='col-md-12 error'>Please enter an answer</div>").css("font-family","Gill Sans")
            $(this).parent().append(error_msg)
        }

        else if(!($.isNumeric($(this).val())) && question["lines"][id]["answer_type"]=="numeric"){
            error = 1
            let error_msg = $("<div class='col-md-12 error'>Please enter a numerical value</div>").css("font-family","Gill Sans")
            $(this).parent().append(error_msg)
        }
        else if($.isNumeric($(this).val()) && question["lines"][id]["answer_type"]=="text"){
            error = 1
            let error_msg = $("<div class='col-md-12 error'>Please enter a non-numerical value</div>").css("font-family","Gill Sans")
            $(this).parent().append(error_msg)
        }

    })
    if(error != 1){
        let ids = []
        let user_values = []
        let answers = []
        let correctness = []
        $(".fill_in_answer").each(function(){
            let val = $(this).val().toLowerCase()
            let id = $(this).attr("id")
            let answer = question["lines"][id]["answer"]
            
            ids.push(id)
            user_values.push(val)
            answers.push(answer)
            // console.log(id)


            if(val == answer.toLowerCase()){
                score = score + 1
                let feedback = $("<div class='correct'>Correct</div>").css("font-family","Gill Sans")
                $(this).parent().append(feedback)

                correctness.push("Yes")
            }
            else{
                let feedback = $("<div class='incorrect'>" + "Incorrect." + " Correct answer: " + answer + "</div>").css("font-family","Gill Sans")
                $(this).parent().append(feedback)

                correctness.push("No")
            }

            $(this).attr("disabled", "disabled")
        })

        update_fill_in_the_blank(ids, user_values, correctness)

        // console.log(ids)
        // console.log(user_values)
        // console.log(answers)
        // console.log(correctness)

        // console.log(user_answers["answered"]["3"])

        // console.log(score)

        new_score = score + parseInt(user_answers['score'])

        $(".score").html("Overall score: " + new_score + "/" + question["max_score"]).css("font-weight", "bold")

        $(".check_button").off('click')
    }
}

function fill_in_answers(user_answers, question){
    if (user_answers["answered"]["3"] == "Yes"){
        console.log("already answered")
        $(".fill_in_answer").each(function(index, value){
            id = (index + 1).toString()
            user_answer = user_answers['fill_in_the_blank'][id][0]
            correctness = user_answers['fill_in_the_blank'][id][1]
            $(this).val(user_answer)
            if (correctness == "Yes"){
                let feedback = $("<div class='correct'>Correct</div>").css("font-family","Gill Sans")
                $(this).parent().append(feedback)
            }
            else{
                let correct_answer = question["lines"][id]["answer"]
                let feedback = $("<div class='incorrect'>" + "Incorrect." + " Correct answer: " + correct_answer + "</div>").css("font-family","Gill Sans")
                $(this).parent().append(feedback)
            }

            $(this).attr("disabled", "disabled")

            $(".score").html("Overall score: " + user_answers["score"] + "/" + question["max_score"]).css("font-weight", "bold")

            $(".check_button").off('click')

            // console.log(id)
            // console.log(value)
        });
    }
}

$(document).ready(function(){
    make_quiz()
    fill_in_answers(user_answers, question)
    make_other_quiz_buttons()

    // console.log(user_answers["answered"]["3"])

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
