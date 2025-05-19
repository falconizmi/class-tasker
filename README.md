# class-tasker
Class tasker is web app that let teachers create room for their students where they can add there school task for them

## Supported Operating systems
- Linux
- Window (Not supported yet)

## Requirements
postgres 17

## Try locally 
### Clone repo
```
git clone https://github.com/falconizmi/class-tasker.git
```

### Setup your .env
```
cd ./deploy/dev/
cp .env.example .env
# then edit as needed
```

### Run docker compose
#### Windows:

open docker-desktop
```
docker up-db
```
wait around 5-10sec then run
```
docker compose run --rm migrate alembic upgrade head
docker compose up --build
```
and open the local link http://localhost:5173/

#### Linux:

Use provided commands from [Makefile](/deploy/dev/Makefile) and run inside `./deploy/dev/`
```
docker up-db
```
wait around 5-10sec then run
```
docker migrate
docker up-build-logs
```
and open the local link http://localhost:5173/

Check here for more commands: [Makefile](/deploy/dev/Makefile) and [deploy/README.md](/deploy/dev/README.md)

## Featues
### Custom Sign-in and Sign-up pages
![](/app_examples/sign-in.png)

![](/app_examples/sign-up.png)

## Teacher view of the main page
Teachers functions:
- create classroms for studnets (and join the classrooms)
- add activities for student - task/event

![](/app_examples/main-page-teacher-view.png)

## Student view of the main page
Student functions:
- and join the classrooms
- view

![](/app_examples/main-page-student-view.png)