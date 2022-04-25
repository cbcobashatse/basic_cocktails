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
        "ingredients": ["1.5 oz Tequila", "4 oz Orange Juice", "0.25 oz Grenadine", "Cherry Garnish"], 
        "alt_text": ""
    },
    "2":{
        "id": "2",
        "title": "Cosmopolitan",
        "image": "https://images.food52.com/aJEv48_UtTTPlnWv5m4FoaUKzIU=/fit-in/1200x1200/4af84f60-dc41-4b3e-ae24-068bb2d5bed0--2019-0905_cosmopolitan_3x2_rocky-luten_069.jpg",
        "description": "A cosmopolitan, according to Punch Magazine, is an alcoholic cocktail served in a martini glass made with a combination of vodka, cranberry juice, triple sec, and lime. It first came on the scene around the emergence of the Gay Rights movement, before the cocktail renaissance, as they put it, and stole the show, becoming a quick classic.",
        "ingredients": ["1.5 oz Citron Vodka", "0.5 oz Triple Sec", "0.5 oz Lime Juice", "1 oz Cranberry Juice", "0.5 oz Simple Syrup", "Lime Garnish"], 
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

quiz_questions = {
    "1":{
        "id": "1",
        "question_type": "Choose the correct image",
        "title": "Tequila Sunrise",
        "correct_image": "https://foodworthfeed.com/wp-content/uploads/2021/05/Strawberry-Rose-Tequila-Sunrise.jpg",
        "alt_text1": "Tequila Sunrise cocktail",
        "wrong_image": "https://vinepair.com/wp-content/uploads/2021/04/sexonthebeach_card-375x450.jpg",
        "alt_text2": "Sex on the Beach cocktail",
        "max_score": "1",
        "next_question": "2"
    },

    "2":{
        "id": "2",
        "question_type": "Drag and drop",
        "title": "Tequila Sunrise",
        "ingredients": ["Tequila", "Orange Juice", "Grenadine", "Cherry Garnish"],
        "choices": ["Tequila", "Triple Sec", "Orange Juice", "Grenadine", "Citron Vodka", "Lime Juice", "Cranberry Juice", "Lime Garnish", "Cherry Garnish", "Simple Syrup", "Peach Schnapps"],
        "image": "https://foodworthfeed.com/wp-content/uploads/2021/05/Strawberry-Rose-Tequila-Sunrise.jpg",
        "alt_text": "Tequila Sunrise cocktail",
        "max_score": "5",
        "next_question": "3"
    },

    "3":{
        "id": "3",
        "question_type": "Fill in the blank",
        "title": "Tequila Sunrise",
        "lines": {
            "1": {
                "blank_alignment": "before",
                "visible_text": "oz Tequila",
                "answer": "1.5",
                "answer_type": "numeric"
            },
            "2": {
                "blank_alignment": "before",
                "visible_text": "oz Orange Juice",
                "answer": "4",
                "answer_type": "numeric"
            },

            "3": {
                "blank_alignment": "before",
                "visible_text": "oz Grenadine",
                "answer": "0.25",
                "answer_type": "numeric"
            },

            "4": {
                "blank_alignment": "before",
                "visible_text": "Garnish",
                "answer": "Cherry",
                "answer_type": "text"
            }
        },
        "image": "https://foodworthfeed.com/wp-content/uploads/2021/05/Strawberry-Rose-Tequila-Sunrise.jpg",
        "alt_text": "Tequila Sunrise cocktail",
        "max_score": "4",
    },

    "4":{
        "id": "4",
        "question_type": "Choose the correct image",
        "title": "Cosmopolitan",
        "correct_image": "https://images.food52.com/aJEv48_UtTTPlnWv5m4FoaUKzIU=/fit-in/1200x1200/4af84f60-dc41-4b3e-ae24-068bb2d5bed0--2019-0905_cosmopolitan_3x2_rocky-luten_069.jpg",
        "alt_text1": "Cosmopolitan cocktail",
        "wrong_image": "https://vinepair.com/wp-content/uploads/2021/04/sexonthebeach_card-375x450.jpg",
        "alt_text2": "Sex on the Beach cocktail",
        "max_score": "1",
        "next_question": "5"
    },

    "5":{
        "id": "5",
        "question_type": "Drag and drop",
        "title": "Cosmopolitan",
        "ingredients": ["Citron Vodka", "Triple Sec", "Lime Juice", "Cranberry Juice", "Simple Syrup", "Lime Garnish"],
        "choices": ["Tequila", "Triple Sec", "Orange Juice", "Grenadine", "Citron Vodka", "Lime Juice", "Cranberry Juice", "Lime Garnish", "Cherry Garnish", "Simple Syrup", "Peach Schnapps"],
        "image": "https://images.food52.com/aJEv48_UtTTPlnWv5m4FoaUKzIU=/fit-in/1200x1200/4af84f60-dc41-4b3e-ae24-068bb2d5bed0--2019-0905_cosmopolitan_3x2_rocky-luten_069.jpg",
        "alt_text": "Cosmopolitan cocktail",
        "max_score": "6",
        "next_question": "6"
    },

    "6":{
        "id": "6",
        "question_type": "Fill in the blank",
        "title": "Cosmopolitan",
        "lines": {
            "1": {
                "blank_alignment": "before",
                "visible_text": "oz Citron Vodka",
                "answer": "1.5",
                "answer_type": "numeric"
            },
            "2": {
                "blank_alignment": "before",
                "visible_text": "oz Triple Sec",
                "answer": "0.5",
                "answer_type": "numeric"
            },

            "3": {
                "blank_alignment": "after",
                "visible_text": "0.5 oz",
                "answer": "Lime Juice",
                "answer_type": "text"
            },

            "4": {
                "blank_alignment": "before",
                "visible_text": "oz Cranberry Juice",
                "answer": "1",
                "answer_type": "numeric"
            },

            "5": {
                "blank_alignment": "before",
                "visible_text": "oz Simple Syrup",
                "answer": "0.5",
                "answer_type": "numeric"
            },

            "6": {
                "blank_alignment": "before",
                "visible_text": "Garnish",
                "answer": "Lime",
                "answer_type": "text"
            }
        },
        "image": "https://images.food52.com/aJEv48_UtTTPlnWv5m4FoaUKzIU=/fit-in/1200x1200/4af84f60-dc41-4b3e-ae24-068bb2d5bed0--2019-0905_cosmopolitan_3x2_rocky-luten_069.jpg",
        "alt_text": "Cosmopolitan cocktail",
        "max_score": "6",
    },

    "7":{
        "id": "7",
        "question_type": "Choose the correct image",
        "title": "Sex on the Beach",
        "correct_image": "https://vinepair.com/wp-content/uploads/2021/04/sexonthebeach_card-375x450.jpg",
        "alt_text1": "Sex on the Beach cocktail",
        "wrong_image": "https://foodworthfeed.com/wp-content/uploads/2021/05/Strawberry-Rose-Tequila-Sunrise.jpg",
        "alt_text2": "Tequila Sunrise cocktail",
        "max_score": "1",
        "next_question": "5"
    },    

    "8":{
        "id": "8",
        "question_type": "Drag and drop",
        "title": "Sex on the Beach",
        "ingredients": ["Vodka", "Peach Schnapps", "Orange Juice", "Cranberry Juice"],
        "choices": ["Tequila", "Triple Sec", "Orange Juice", "Grenadine", "Citron Vodka", "Lime Juice", "Cranberry Juice", "Lime Garnish", "Cherry Garnish", "Simple Syrup", "Peach Schnapps"],
        "correct": "https://vinepair.com/wp-content/uploads/2021/04/sexonthebeach_card-375x450.jpg",
        "alt_text": "Sex on the Beach cocktail",
        "max_score": "4",
        "next_question": "9"
    },

    "9":{
        "id": "9",
        "question_type": "Fill in the blank",
        "title": "Sex on the Beach",
        "lines": {
            "1": {
                "blank_alignment": "before",
                "visible_text": "oz Vodka",
                "answer": "1",
                "answer_type": "numeric"
            },
            "2": {
                "blank_alignment": "before",
                "visible_text": "oz Peach Schnapps",
                "answer": "0.5",
                "answer_type": "numeric"
            },

            "3": {
                "blank_alignment": "before",
                "visible_text": "oz Cranberry Juice",
                "answer": "2",
                "answer_type": "numeric"
            },

            "4": {
                "blank_alignment": "after",
                "visible_text": "2 oz",
                "answer": "Orange Juice",
                "answer_type": "text"
            }
        },
        "image": "https://vinepair.com/wp-content/uploads/2021/04/sexonthebeach_card-375x450.jpg",
        "alt_text": "Sex on the Beach cocktail",
        "max_score": "4",
    },
}

user_answers = {
    "image" : "Not selected yet",
    "drag_and_drop": [],
    "fill_in_blank": []
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

@app.route('/learn/<id>/description')
def display_description(id=None):
    global cocktails
    cocktail = cocktails[id]
    return render_template('description.html', cocktail = cocktail)

@app.route('/learn/<id>')
def learn_cocktail(id=None):
    
    global cocktails
    cocktail = cocktails[id]
    return render_template('learn_cocktail.html', cocktail = cocktail) 

@app.route('/quiz')
def display_quiz():
    return render_template('quiz.html', cocktails = cocktails)

@app.route('/quiz/<id>')
def quiz_cocktail(id=None):
    global cocktails
    global quiz_questions
    question = quiz_questions[id]
    question_type = question["question_type"]
    if question_type == "Choose the correct image":
        return render_template('correct_image.html', question = question, user_answers = user_answers)

    elif question_type == "Drag and drop":
        return render_template('drag_and_drop.html', question = question, user_answers = user_answers)

    else:
        return render_template('fill_in_the_blank.html', question = question, user_answers = user_answers, cocktails = cocktails)

#-----------AJAX code-------------#

@app.route('/update_answers', methods = ['GET', 'UPDATE'])
def update_answers():
    print("got here")
    global user_answers

    # get data from JSON
    json_data = request.get_json()
    answer = json_data["answer"]

    # update the answer
    user_answers['image'] = answer

    return jsonify(user_answers = user_answers)

@app.route('/from_choice_to_answer', methods=['GET', 'UPDATE'])
def from_choice_to_answer():
    # print("got here")
    global quiz_questions
    global user_answers

    # get data from JSON
    json_data = request.get_json()
    answer = json_data["answer"]
    question = json_data["question"]

    # delete the choice from the global quiz_questions variable
    current_id = question["id"]
    quiz_questions[current_id]["choices"].remove(answer)

    # add the choice/answer to the user_answers variable
    user_answers["drag_and_drop"].append(answer)

    question = quiz_questions[current_id]
    return jsonify(question = question, user_answers = user_answers)

@app.route('/from_answer_to_choice', methods=['GET', 'UPDATE'])
def from_answer_to_choice():
    # print("got here")
    global quiz_questions
    global user_answers

    # get data from JSON
    json_data = request.get_json()
    answer = json_data["answer"]
    question = json_data["question"]

    # delete the choice from the global quiz_questions variable
    current_id = question["id"]
    quiz_questions[current_id]["choices"].append(answer)

    # add the choice/answer to the user_answers variable
    user_answers["drag_and_drop"].remove(answer)

    question = quiz_questions[current_id]
    return jsonify(question = question, user_answers = user_answers)


############################STANDARD THINGS WE NEED##############################
if __name__ == '__main__':
   app.run(debug = True)


