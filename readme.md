# docker-tutorial

This repo contains a simple example 3-tier Node.js application demonstrating
ways that Docker can be used for a local development environment.

## Docker commands

To build the API docker image, within the `api` directory, the command
`docker build -t docker-tutorial_api .` can be run.  To run a container with
this image, within the `api` directory, the command
`docker run -it --rm -v $(pwd)/src:/usr/src/app/src -p3000:3000 docker-tutorial_api`
can be run.  **NOTE** for this particular application a DB is required and will
need to be run and available to the API container -- see the Docker compose
section below for an easy way to do this.

To build the UI docker image, within the `ui` directory, the command
`docker build -t docker-tutorial_ui .` can be run.  To run a container with
this image, within the `ui` directory the command
`docker run -it --rm -v $(pwd)/public:/usr/src/app/public -v $(pwd)/src:/usr/src/app/src -p3000:3000 docker-tutorial_ui` can be run.  **NOTE** for this particular
application an API is required to be running and made available to the user's
web browser at the hostname `api.localhost` -- see the Docker compose section
below for an easy way to do this.

To build the DB docker image, within the `db` driectory the command
`docker build -t docker-tutorial_db .` can be run.  To run a container with
this image the command `docker run -it --rm -p5432:5432 docker-tutorial_db`
can be run.

## Docker Compose commands

In the root directory of this repo is a `docker-compose.yaml` file that can be
used to build and run all of these services in a development environment that
has each of the services wired together to communicate with one another.

To build/pull all of the images needed by the services, not strictly necessary
to do beforehand but sometimes useful to test out changes to `Dockerfile` files
the command `docker-compose build` can be used.

To bring the services up the command `docker-compose up` can be used.  This
will launch each service and connect the console to the standard output
stream of their container.  If the `docker-compose` process is killed then each
of the service containers will also be killed.  Use the `-d` argument to the
`up` command if you'd like to launch the services detatched from the
`docker-compose` process.  Additionally the name of one or more services can be
added as an argument to the up command to launch only those services (e.g
`docker-compose up db api` to launch just the database and API services).

To stop running services the `docker-compose down` command can be used.  This
command stops the services but preserves any volumes they may have, using them
the next time the service is brought up.  If you'd like to delete the volume
when the service is stopped the `-v` argument can be added to the down command.
If you'd also like to remove any local images that were build for the services
when they're stopped then the `--rmi local` argument can also be added.

Finally, to attach to the logs of one or more running services the command
`docker-compose logs` can be used.  By default the logs for all services will be
shown, but like the other commands specific service names can be appened to the
command it logs for only those services will be shown.  Additionally the `-f`
argument can be applied to have the command not terminate and instead follow the
logs for the specified service(s).
