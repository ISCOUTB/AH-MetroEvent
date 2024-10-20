import os
from dotenv import load_dotenv
import mysql.connector
from mysql.connector import Error

load_dotenv()

try:
    conexion = mysql.connector.connect(
        user=os.environ.get("DB_USER"),
        password=os.environ.get("DB_PASSWORD"),
        host="localhost",
        database="base_web",
        port="3306"
    )

    if conexion.is_connected():
        print("Conexión exitosa a la base de datos.")
        db_info = conexion.get_server_info()
        print("Versión del servidor MySQL:", db_info)
        
except Error as e:
    print("Error al conectarse a MySQL:", e)
