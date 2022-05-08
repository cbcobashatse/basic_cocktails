function  add_a_definition1(item){
    let curItem = item 
    
    let title = curItem["title"]
    let image = curItem["image"]
    let description = curItem["description"]
    let altText = curItem["alt_text"]

    let content = $("<img src='"+image+"' width= '100%'>");

    let col = $('<div class="col-md-4 col-padding"></div>')
    let row1 = $('<div class="row"></div>')
    let row2 = $('<div id = "r2" class="row"></div>')
    let row3 = $('<div id = "r3" class="row"></div>')

    $(row1).append(title)
    $(row1).append('<br><button id="flip" type="button" value="Flip" onclick="flash(r2, r3)">Flip</button>').css("font-family", "Gill Sans")
    $(row2).append(content)

    $(row3).append(description)
    $(col).append(row1)
    $(col).append(row2)


    $(col).append(row3)

    $("#basic-tools-div").append(col) 
    var r2 = document.getElementById("r2");
    var r3 = document.getElementById("r3");
    r3.style.visibility = "hidden";
}

function  add_a_definition2(item){
    let curItem = item 
    
    let title = curItem["title"]
    let image = curItem["image"]
    let description = curItem["description"]
    let altText = curItem["alt_text"]

    let content = $("<img src='"+image+"' width= '100%'>");

    let col = $('<div class="col-md-4 col-padding"></div>')
    let row1 = $('<div class="row"></div>')
    let row2 = $('<div id = "r2_1" class="row"></div>')
    let row3 = $('<div id = "r3_1" class="row"></div>')

    $(row1).append(title)
    $(row1).append('<br><button id="flip" type="button" value="Flip" onclick="flash(r2_1, r3_1)">Flip</button>').css("font-family", "Gill Sans")
    $(row2).append(content)

    $(row3).append(description)
    $(col).append(row1)
    $(col).append(row2)

    $(col).append(row3)

    $("#basic-tools-div").append(col) 
    var r2 = document.getElementById("r2_1");
    var r3 = document.getElementById("r3_1");
    r3.style.visibility = "hidden";
}


function flash(r2, r3) {
    if (r2.style.visibility != "hidden") {
        r2.style.visibility = "hidden";
        r3.style.visibility = "visible";
    } else {
        r2.style.visibility = "visible";
        r3.style.visibility = "hidden";
    }
  }

$(document).ready(function(){
    console.log("basics page reached") 
    add_a_definition1(basic_tools["1"])
    add_a_definition2(basic_tools["2"])

    let col = $('<div class="col-md-1 col-padding"></div>')
    $("#basic-tools-div").append(col) 
})