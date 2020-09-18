# FlickPick
Andrew Cuccinello : cuccinela5@students.rowan.edu \
Daniel Fooks : fooksd3@students.rowan.edu \
Elvin Torres : torres62@students.rowan.edu \
Jason Zogheb : zogheb89@students.rowan.edu \
Justus Fee : feej0@students.rowan.edu \
Kyle Robinson : robins94@students.rowan.edu \
Reno Levari : levari82@students.rowan.edu \
Scott Zockoll : zockol72@students.rowan.edu

# Setup
1. Install the required software (everyone ***MUST*** use the same software)
    * [WebStorm](https://www.jetbrains.com/webstorm/) for front end development
    * [NodeJS 14.11.0](https://nodejs.org/en/) for front end development
    * [PyCharm](https://www.jetbrains.com/pycharm/) for backend development
        * [Anaconda](https://www.anaconda.com/) as your Python distribution
    * [Install Git LFS](https://git-lfs.github.com/) for everyone
    * (Optional) [Postman](https://www.postman.com/) for everyone
    
    > Note WebStorm & PyCharm are both paid products that you can get for [free as a student](https://www.jetbrains.com/community/education/#students)
2. Initialize Git LFS
    > In `<repository>/` run

    ```shell script
    $ git lfs install
    ```
3. Create & initialize your Conda environment
    > In `<repository>/` run

    ```shell script
    $ conda create --name <env> --file environment.yaml
    ```
4. Install the front end dependencies
    > In `<repository>/client` run
    ```shell script
    $ npm install
    ```
5. Setup PyCharm
    > File > Settings > Project: \<repository\> > Python Interpreter
    >
    > Click the cogwheel on the right next to the dropdown then click "Add..."
    >
    > You want "Existing Environment" then choose the env from step 3
    > 
    > OK

6. Setup Flask Environment (Windows)
    > In `<repository>/server` run
    ```shell script
    $ set FLASK_APP=__init__.py
    $ set FLASK_ENV=development
    ```
   
6. Setup Flask Environment (Unix)
    > In `<repository>/server` run
    ```shell script
    $ export FLASK_APP=__init__.py
    $ export FLASK_ENV=development
    ```
   
# Develop
You can run the client and server individually or both at once.

##### Both the client and server
> In `<repository>/` run
    
```shell script
$ dev
```

The client and server will open in new windows. They will reload individually when you make changes to them.

##### Just the client
> In `<repository>/` run
    
```shell script
$ client
```

The site will open in your browser and automatically reload when changes are made to the client files.

##### Just the server
> In `<repository>/` run
    
```shell script
$ server
```

The server will reload when you make changes to the files.