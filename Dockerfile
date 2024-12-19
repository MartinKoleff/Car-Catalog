#Use Node.js as the base image
FROM node:18

#Set the working directory inside the container
WORKDIR /app

#Copy package.json and package-lock.json into the container
COPY package.json .

#Install the dependencies
RUN npm install

#Copy the rest of the application code
COPY . .

#Expose the port that the server will run on
EXPOSE 3000

#Start the server
CMD ["node", "server.js"]
