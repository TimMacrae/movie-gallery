### Setup backend

### Navigate to the backend folder and run

```bash
 npm install
```

### Create an .env file and add these values to the file:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/
MONGO_URI_TEST=mongodb://localhost:27017/tests
JWT_SECRET=your-secret-key
JWT_EXPIRATION=10h
```

### Setup MongoDB with docker

```bash
    docker pull mongo
    docker run --name movie-gallery -d -p 27017:27017 mongo
```

### Check that the container is running

```bash
    docker ps
```

### You can now connect with Mongo Compas or Mongo Shell

```bash
Compas: mongodb://localhost:27017
Shell: mongo --host localhost --port 27018
```

### To stop the MongoDB container, run:

```bash
docker stop my-mongo
```

### To start it again:

```bash
docker start my-mongo
```

### Insert mock data (movies, comments, users and ratings) into the database, run this command one by one at the root of the backend folder

```bash
npx ts-node jobs/movies/create-movie-db.job.ts
npx ts-node jobs/comments/create-comments-db.job.ts
npx ts-node jobs/user/create-user-db.job.ts
npx ts-node jobs/ratings/create-ratings-db.job.ts

```

### Start the backend:

```bash
npm run start
```

you should see this in your terminal:
Server is running on http://localhost:3000
Connected to MongoDB

### Setup frontend

navigate to the frontend folder and run:

```bash
npm install
```

### Add this to your .env.local file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### In the root of the frontend folder run:

```bash
npm run dev
```

### You can find some movie posters in the test-movie-poster folder to create a movie or you can download some from this website:https://fanart.tv/

### Not Logged-in User Access to:

- Home page /
- Movies page /movies “Here you can see all movies and filter them.”
- Movie page /movies/id
- Sign in /signin
- Sign up /signup

### Logged-in User Access to:

- All of the above
- Gallery page /gallery “Here you can see the movies you have created and update them.”
- Favorites page /favorites “Here are all the movies that you have marked as favorites.”
- You can now comment on the /movies/id page.
- You can now rate movies on the /movies/id page.
- You can now change the details only for movies you have created.
