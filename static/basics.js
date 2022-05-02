function  add_a_definition(item){
    let curItem = item 
    
    let title = curItem["title"]
    let image = curItem["image"]
    let description = curItem["description"]
    let altText = curItem["alt_text"]

    let content = $("<img src='"+image+"' width= '100%'>");

    let col = $('<div class="col-md-4 col-padding"></div>')
    let row1 = $('<div class="row"></div>')
    let row2 = $('<div class="row"></div>')
    let row3 = $('<div class="row"></div>')
 //   let button = $('<br><button id="flip" type="button" value="Flip" onclick="flash()">Flip</button>')

    $(row1).append(title)
    $(row2).append(content)

    $(row3).append(description)
    $(col).append(row1)
    $(col).append(row2)
   // $(col).append(button)
    $(col).append(row3)

    $("#basic-tools-div").append(col) 
}

function flash() {
    if (row2.style.visibility != "hidden") {
        row2.style.visibility = "hidden";
        row3.style.visibility = "visible";
    } else {
        row2.style.visibility = "visible";
        row3.style.visibility = "hidden";
    }
  }

$(document).ready(function(){
    console.log("basics page reached") 
    add_a_definition(basic_tools["1"])
    add_a_definition(basic_tools["2"])
    
})