# RZA Backend

To setup the backend first create a virtual enviroment with the command: `py -m venv venv` or `python3 -m venv venv if on unix`

Next activate the virtual environment with the command: `venv/scripts/activate` or `source venv/bin/activate` if on linux

Then you should install all the dependencies with the command: `pip install -r ./requirements.txt`

Finally you can run the server with the command: `uvicorn app:app --reload`
