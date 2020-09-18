from server import app

@app.route('/api/v1/user/<int:id>', methods=['GET'])
def get_user(id: int):
    return {
        "id": id,
        "email": "example@example.com",
        "firstName": "Joe",
        "lastName": "Smith"
    }


@app.route('/api/v1/user/<int:id>', methods=['DELETE'])
def del_user(id: int):
    return {
        "id": id,
        "result": "OK"
    }
