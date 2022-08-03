import json
from flask import request, Flask, render_template
import random
from flask_socketio import SocketIO

app = Flask(__name__)
#socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test', methods=['POST','GET'])
def test():
    if request.method == 'POST':
        output = request.get_json()
        result = json.loads(output) #this converts the json output to a python dictionary
        #print(result) # Printing the new dictionary
    elif request.method == 'GET':
        chance = random.choice(range(1,10))
        if chance > 6:
            pular = {'pular':1}
        else:
            pular = {'pular':0}
        return pular

@app.get('/shutdown')
def shutdown():
    global server
    server.shutdown()
    print('============================================= acabou ===================================')
    return 'Server shutting down...'

if __name__ == "__main__":
    app.run(debug=True)