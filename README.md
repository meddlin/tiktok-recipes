# TikTok Recipes

[https://tiktok-recipes.vercel.app/](https://tiktok-recipes.vercel.app/)

A no-nonsense recipes app, based on TikTok videos.

I started having excellent recipe videos recommended to me on TikTok, and 
while the app allows you to create folders in your favorites (excellent 
for revisiting them!)..._you can't share the collection._ On top of that 
sometimes the videos have the recipe in the description, comments, or 
even just text in the video itself.

All in all, not the best way to revisit these recipes to make them later. 
So, I thought this was a good opportunity to create a recipe app to share
them!

## Getting Started

tiktok-recipes is built on top of Next.js.

To run the development server:

- `npm install`
- `npm run dev`

\# or 

- `yarn dev`


## Scraping

A good summary list of scrapers: [https://elitedatascience.com/python-web-scraping-libraries#beautiful-soup](https://elitedatascience.com/python-web-scraping-libraries#beautiful-soup)

Following this tutorial: [https://docs.scrapy.org/en/latest/intro/tutorial.html](https://docs.scrapy.org/en/latest/intro/tutorial.html)

## Data Layer - Docker

Start local database stack:

```bash
docker compose up -d
```

Data is persisted at the location specified in:

```bash
volumes:
    - mongo-data:/data/db
```

### Connection Strings

Connection string for this db: `mongodb://root:example@localhost:27017/cookbook?authSource=admin`

Format: `mongodb://<user>:<password>@<host>:<port>/<database>?authSource=<auth-db>`

> Note on connecting local clients, tools, etc.
>
> Within the docker compose file, and Docker network is in play and you can use the container name to connect to 
> the host. However, use `localhost` from the local machine.

#### Configuration Note 1

Know how to set default database.

Without specifying a `<database>` Mongo defaults to `test`. And you will be confused, because it created 
a new database, not specified anywhere in the code.

#### Configuration Note 2

Always specify `authSource=<auth-db>`

Specify an authentication database with the `authSource=<auth-db>` query parameter. Specifying a database,
will cause Mongo to not know where to look for authenticating users. This will result in confusing 
"Authentication failed" errors.

Ref: [https://dba.stackexchange.com/questions/185783/how-to-specify-authentication-database-and-target-database-separately-on-mongodb](https://dba.stackexchange.com/questions/185783/how-to-specify-authentication-database-and-target-database-separately-on-mongodb)