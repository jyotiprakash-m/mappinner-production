# Mappinner-Production On Heroku

* Create two .env files in `./.env` and `./client/.env`
* Inside `./.env` create an environment variable named  `MONGO_URL` from mongodb
* Inside  `./client/.env` create an environment variable named  `REACT_APP_MAPBOX` , which is basically the api key of mapbox 

* Note : Map will be visible on localhost on it s free trial . 

## Command to deploy on heroku
* First install cli and login to heroku with perfect credential
* `heroku create repo_name` . Then create an repository
* `heroku git:remote -a repo_name` . Then set the repository
* `git push heroku master` . This will live your project