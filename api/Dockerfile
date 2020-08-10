FROM node:14-alpine as development

# Set our node environment to development.
ENV NODE_ENV "development"

# Expose the service using the standard of port 3000.
EXPOSE 3000

# Define where in the container we're going to store all of our source.
WORKDIR /usr/src/app

# Download dependencies into the image prior to copying over any source files.
# This allows the download to be cached into a layer so that we don't have to
# repeat the download each time a source file changes.
COPY package.json yarn.lock ./
RUN yarn install        \
      --no-optional     \
      --non-interactive \
      --loglevel error  \
      --prefer-offline
ENV PATH /usr/src/app/node_modules/.bin:${PATH}

# Copy our source code into the container.
COPY . .

# Start our application using nodemon so that it'll auto reload when source
# files change.
CMD ["nodemon"]