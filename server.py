############################STANDARD THINGS WE NEED##############################
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

####################################VARIABLES####################################

cocktails = {
    "1":{
        "id": "1",
        "title": "Tequila Sunrise",
        "image": "https://foodworthfeed.com/wp-content/uploads/2021/05/Strawberry-Rose-Tequila-Sunrise.jpg",
        "description": "The tequila sunrise is a cocktail made of tequila, orange juice, and grenadine syrup. It's served unmixed in a tall glass. The modern drink originates from Sausalito, California, in the early 1970s after an earlier one created in the 1930s in Phoenix, Arizona.",
        "ingredients": ["1.5 oz Tequila", "4 oz Orange Juice", ".25 oz Grenadine", "Cherry garnish"], 
        "alt_text": ""
    },
    "2":{
        "id": "2",
        "title": "Cosmopolitan",
        "image": "https://images.food52.com/aJEv48_UtTTPlnWv5m4FoaUKzIU=/fit-in/1200x1200/4af84f60-dc41-4b3e-ae24-068bb2d5bed0--2019-0905_cosmopolitan_3x2_rocky-luten_069.jpg",
        "description": "A cosmopolitan, according to Punch Magazine, is an alcoholic cocktail served in a martini glass made with a combination of vodka, cranberry juice, triple sec, and lime. It first came on the scene around the emergence of the Gay Rights movement, before the cocktail renaissance, as they put it, and stole the show, becoming a quick classic.",
        "ingredients": ["1.5 oz Vodka ", "0.5 oz Triple Sec", "0.5 oz Lime Juice", "1 oz Cranberry Juice", "0.5 oz Simple Syrup", "Lime Garnish"], 
        "alt_text": ""
    },
    "3":{
        "id": "3",
        "title": "Sex on the Beach",
        "image": "https://vinepair.com/wp-content/uploads/2021/04/sexonthebeach_card-375x450.jpg",
        "description": "While no one can agree where the drink originated, many suggest the cocktail may have been invented when a bartender combined a Fuzzy Navel (peach schnapps and orange juice) with a Cape Codder (vodka and cranberry juice). Put those two drinks together, and all the constituent parts of the Sex on the Beach are accounted for. Some recipes also call for a small measure of crème de cassis, but that is usually considered optional.",
        "ingredients": ["1 oz Vodka", "0.5 oz Peach Schnapps", "2 oz Orange Juice", "2 oz Cranberry Juice"], 
        "alt_text": ""
    }
}

basic_tools = {
    "1":{
        "id": "1",
        "title": "Jigger",
        "image": "https://assets.wsimgs.com/wsimgs/rk/images/dp/wcm/202214/0546/img73o.jpg",
        "description": "A jigger is a bartender's measuring cup. They are typically double sided with each end designed to fit a specified volumetric amount in ounces.",
        "alt_text": ""
    },
    "2":{
        "id": "2",
        "title": "Pour Top",
        "image": "https://ae01.alicdn.com/kf/HTB15W0cuNSYBuNjSsphq6zGvVXax/2016-Top-Sale-2Pcs-Stainless-Steel-Liquor-Spirit-Pourer-Flow-Wine-Bottle-Pour-Spout-Stopper-Barware.jpg",
        "description": "Pour tops are designed to fit inside most standard liquor bottles. They are designed to have a constant flow rate of liquid through the spout as long as the liquor bottle is fully inverted",
        "alt_text": ""
    }
}

####################################ROUTES####################################
@app.route('/')
def hello_world():
   return render_template('home.html')

@app.route('/basics')
def display_basics():
   return render_template('basics.html', basic_tools = basic_tools) 

@app.route('/learn')
def display_learn():
    return render_template('learn.html', cocktails = cocktails)

@app.route('/learn/<id>')
def learn_cocktail(id=None):
    
    global cocktails
    cocktail = cocktails[id]
    return render_template('learn_cocktail.html', cocktail = cocktail) 

@app.route('/quiz')
def display_quiz():
    return render_template('quiz.html')



############################STANDARD THINGS WE NEED##############################
if __name__ == '__main__':
   app.run(debug = True)


