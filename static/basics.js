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

    $(row1).append(title)
    $(row2).append(content)
    $(row3).append(description)

    $(col).append(row1)
    $(col).append(row2)
    $(col).append(row3)

    $("#basic-tools-div").append(col) 
}

$(document).ready(function(){
    console.log("basics page reached") 
    add_a_definition(basic_tools["1"])
    add_a_definition(basic_tools["2"])
    
})