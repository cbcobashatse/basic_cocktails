function create_images(question) {
    let altText1 = question["alt_text1"]
    let altText2 = question["alt_text2"]

    let random_num = Math.floor((Math.random() * 2) + 1);
    
    let col_1 = $('<div class="col-md-6"></div>')
    let col_2 = $('<div class="col-md-6"></div>')

    correct_image = question["correct_image"]
    wrong_image = question["wrong_image"]

    correct = "<img id='correct' class='dd_image' src='"+correct_image+"'"+" alt='"+altText1+"'>"
    wrong = "<img id='wrong' class='dd_image' src='"+wrong_image+"'"+" alt='"+altText2 + "'>"

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

function update_answers(answer) {
    let data_to_change = {"answer": answer}
    $.ajax({
        type: "UPDATE",
        url: "/update_answers",
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

function fill_in_answers(user_answers){
    image_answer = user_answers['image']
    if (image_answer != "Not selected yet"){
        image_id = "#" + image_answer
        $(image_id).addClass("image_selected ")

        $("#results").empty()
        if (image_answer == 'correct'){
            image_feedback = $("<div class='correct'>Correct image selected!</div>").css("font-family","Gill Sans")
        }
        else{
            image_feedback = $("<div class='incorrect'>Incorrect image selected!</div>").css("font-family", "Gill Sans")
        }
        $("#results").append(image_feedback)
        $("#score").html("Overall score: " + user_answers['score'] + "/" + question["max_score"]).css("font-weight", "bold").css("font-family", "Gill Sans")

        //replacing the check button with the next button
        $('#check_next_button').removeClass("check_button")
        $('#check_next_button').addClass("next_button")
        $('#check_next_button').text("Next Question")

        $('.next_button').click(function(){
            $(".next_feedback").empty()
            console.log("clicked")
            let next_id = question["next_question"]
            document.location.href = "/quiz/" + next_id
            console.log("next")
        })
    } 
}

$(document).ready(function(){
    create_images(question)
    // let score = user_answers['score']
    let answered = user_answers['answered']["1"]
    fill_in_answers(user_answers)

    $(".quiz_home_button").click(function(){
        document.location.href = "/quiz"
    })

    $('.next_button').click(function(){
        $(".next_feedback").empty()
        next_feedback = $("<div class='incorrect'>Please select image and check!</div>").css("font-family","Gill Sans")
        $('.next_feedback').append(next_feedback)
    })

    $('#correct').click(function(){
        if (answered == "No"){
            $(this).addClass("image_selected")
            $('#wrong').removeClass("image_selected")
            update_answers("correct")
        } 
        // console.log(user_answers['score'])
        // console.log("here")
    })
    $('#wrong').click(function(){
        if (answered == "No"){
            $(this).addClass("image_selected")
            $('#correct').removeClass("image_selected")
            update_answers("wrong")
        }
    })

    $(".check_button").click(function(){
        $(".next_feedback").empty()
        let image_feedback = ""
        if (user_answers["image"] == "Not selected yet"){
            $("#results").empty()
            image_feedback = $("<div class='incorrect'>Please select image and check!</div>")
            $("#results").append(image_feedback)
        }
        else{
            if (user_answers["image"] == 'correct'){
                $("#results").empty()
                image_feedback = $("<div class='correct'>Correct image selected!</div>").css("font-family", "Gill Sans")
            }
            else{
                $("#results").empty()
                image_feedback = $("<div class='incorrect'>Incorrect image selected!</div>").css("font-family", "Gill Sans")
            }
            $("#results").append(image_feedback)
            // $("#score").html("Overall score: ")
            $("#score").html("Overall score: " + user_answers['score'] + "/" + question["max_score"]).css("font-weight", "bold").css("font-family", "Gill Sans")
            // console.log(user_answers)

            //replacing the check button with the next button
            $('#check_next_button').removeClass("check_button")
            $('#check_next_button').addClass("next_button")
            $('#check_next_button').text("Next Question")

            //disable click event for the images
            $('#correct').off('click')
            $('#wrong').off('click')

            //record that the question has been answered
            question_answered("1")
        }

        $('.next_button').click(function(){
            $(".next_feedback").empty()
            console.log("clicked")
            let next_id = question["next_question"]
            document.location.href = "/quiz/" + next_id
            console.log("next")
        })
    })

})