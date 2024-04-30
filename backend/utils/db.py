import json

from db.models.zoo_ticket import ZooTicket


def read_db(path: str, model):
    """Reads a json file and converts it to a nicely defined list or dictionary of validated data

    Args:
        path (str): The path to the json database
        model (): The model which will be used to validate the data in the database

    Returns:
        Either a dictionary with the validated data or a list of validated data, depending on the structure of the data in the JSON file
    """
    with open(path, "r") as file:
        if model == ZooTicket:
            db = {}
            parsed_json = json.load(file)
            for key in parsed_json:
                db[key] = model.model_validate(parsed_json[key])
            return db
        return [model.model_validate(object) for object in json.load(file)]

def write_db(path: str, new_db):
    with open(path, "w+") as file:
        if (isinstance(new_db, dict)):
            for key in new_db:
                new_db[key] = new_db[key].model_dump()
                
            json.dump(new_db, file)
            return
        json.dump([object.model_dump() for object in new_db], file)