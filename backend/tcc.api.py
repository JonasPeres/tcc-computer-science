import sqlite3
from sqlite3 import Error
from flask import request
from flask import Flask
from flask import jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/login/insecure', methods=['POST'])
@cross_origin()
def loginInsecure():
  if request.method == 'POST':
    sql = "SELECT * FROM users WHERE user = '" + request.json['user'] + "'" + "AND password = '" + request.json['password'] + "'"
    try:
      conn = sqlite3.connect('tcc.db')
      cur = conn.cursor()
      cur.execute(sql)
      user = cur.fetchall()

      if user:
        return jsonify(user), 200
      else:
        return jsonify({'mensagem': 'Verifique os dados digitados'}), 400
    
    except Error as e:
      return jsonify({'mensagem': e})
    finally:
      conn.close()

@app.route('/login/secure', methods=['POST'])
@cross_origin()
def loginSecure():
  if request.method == 'POST':
    user = request.json['user']
    password = request.json['password']
    sql = "SELECT * FROM users WHERE user = ? AND password = ?"
    try:
      conn = sqlite3.connect('tcc.db')
      cur = conn.cursor()
      cur.execute(sql, (user, password))
      user = cur.fetchall()

      if user:
        return jsonify(user), 200
      else:
        return jsonify({'mensagem': 'Verifique os dados digitados'}), 400
    
    except Error as e:
      return jsonify({'mensagem': e})
    finally:
      conn.close()

if __name__ == "__main__":
  app.run()
