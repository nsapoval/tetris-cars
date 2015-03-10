# imports
import sqlite3
from contextlib import closing
from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash

# configuration
DATABASE = 'users.db'
DEBUG = True
SECRET_KEY = 'muchmemoriessonostalgie'
USERNAME = 'nikol'
PASSWORD = 'yaneverknow'

def connect_db():
    return sqlite3.connect(DATABASE)

def init_db():
    with closing(connect_db()) as db:
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()

app = Flask(__name__)

@app.before_request
def before_request():
    g.db = connect_db()

@app.teardown_request
def teardown_request(exception):
    db = getattr(g, 'db', None)
    if db is not None:
        db.close()

@app.route('/', methods=['GET','POST'])
def index():
    if request.method == 'POST':
        if request.form['username'] != '':
            user = request.form['username']
            cur = g.db.cursor().execute('SELECT name, score FROM users ORDER BY score DESC LIMIT 10') 
            players = [dict(name=row[0], score=row[1]) for row in cur.fetchall()]          
            return render_template('game.html', user = user, top_players = players)
    return render_template('index.html')

@app.route('/_update_scores', methods=['GET'])
def update_top_score():
    if request.method == 'GET':
        g.db.cursor().execute('INSERT INTO users (name,score) VALUES (?,?)', [request.args.get('user', 'noname', type=str), request.args.get('score', 0, type=int)])
        g.db.commit()  

if __name__ == '__main__':
    app.run()