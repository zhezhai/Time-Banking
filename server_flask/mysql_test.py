from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

app = Flask(__name__)

app.config['SQlALCHEMY_DATABASE_URI'] = 'mysql://root:123456@127.0.0.1/TimeBanking'
db = SQLAlchemy(app)


@app.route('/test')
def test():
    sql = text('select * from `user`')
    result = db.engine.execute(sql)
    return jsonify({'result':[i for i in result]})


if __name__ == "__main__":
    db.create_all()
    app.run(host='0.0.0.0', debug=True)
