# NEXT.JS XILAMAVA SHOP
To run it locally need ddbb.
...

docker-compose up -d
...
* -d => __detached__ 

* MongoDB Local URL:
```
mongodb://localhost:27017/entriesdb
```

## Configure env variables
Rename file __.env.template__ a __.env__
* MongoDB Local URL:
...
MONGO_URL=mongodb://localhost:27017/xilamava
...



## Seed db with test data

Call the endpoint:
...
    http://localhost:3000/api/seed
...

