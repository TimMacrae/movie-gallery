### Setup MongoDB with docker

```bash
    docker pull mongo
    docker run --name movie-gallery -d -p 27017:27017 mongo
```

### Check that the container is running

```bash
    docker ps
```

### You can now connect with mongo compas or mongo shell

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

### Insert mock data (movie, comments) into the database, run this command one by one at the root of the project

```bash
npx ts-node apps/backend/jobs/movies/create-movie-db.job.ts
npx ts-node apps/backend/jobs/comments/create-comments-db.job.ts
npx ts-node apps/backend/jobs/user/create-user-db.job.ts
npx ts-node apps/backend/jobs/ratings/create-ratings-db.job.ts

```
