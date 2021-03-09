# coding: utf-8
from mysql_test import db 

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    service = db.Column(db.String(255), nullable=False)
