GraphQL back-end
================

Create the database

```
    npx prisma migrate reset
```

Run prisma studio

```
    npx prisma studio
```

Run apollo server

```
    npm run start
```

Build docker image

```
    docker build -t deadbeefio_api .
```

Run the image

```
    docker run -p 4000:4000 deadbeefio_api
```
