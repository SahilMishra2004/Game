from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tictactoe')
def tictactoe():
    return render_template('tictactoe.html')

@app.route('/snake')
def snake():
    return render_template('snake.html')

@app.route('/guess_number')
def guess_number():
    return render_template('guess_number.html')

@app.route('/wordle')
def wordle():
    return render_template('wordle.html')

@app.route('/turtle_race')
def turtle_race():
    return render_template('turtle_race.html')

@app.route('/maze')
def maze():
    return render_template('maze.html')

@app.route('/blackjack')
def blackjack():
    return render_template('blackjack.html')
@app.route('/rps')
def rps():
    return render_template('rps.html')

@app.route('/paddle')
def paddle():
    return render_template('paddle.html')
    
if __name__ == '__main__':
    app.run(debug=True)