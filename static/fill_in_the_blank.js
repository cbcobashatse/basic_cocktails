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

function check_answers(){
    $(".error").empty()
    $(".correct").empty()
    $(".incorrect").empty()
    let score = 0
    let error = 0
    $(".fill_in_answer").each(function(){
        if($(this).val()==""){
            error=1
            let error_msg = $("<div class='col-md-12 error'>Please enter an answer</div>")
            $(this).parent().append(error_msg)
        }
    })
    if(error!=1){
        $(".fill_in_answer").each(function(){
            let val = $(this).val().toLowerCase()
            let id=$(this).attr("id")
            let answer=question["lines"][id]["answer"]
            if(val==answer.toLowerCase()){
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

        $(".score").html(score + "/" + question["max_score"]).css("font-weight", "bold")
    }
}

$(document).ready(function(){
    make_quiz()

    $(".quiz_home_button").click(function(){
        document.location.href = "/quiz"
    })
})
