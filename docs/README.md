# Overview
The Magic Keyword API is a lightweight API to search keyword for Magic: The Gathering. It provides an easy way for developers/Planeswalkers to search keywords and their definitions.

**Where does all the keywords are store?**

All the keywords are store in the API's internal database.

**What can I receive from this API?**

This API will give you one or multiple keywords along with their definition.

**Do you use this API?**

Yes, I am using this API for my Magic Token creation/tracking app.

[Git Hub repo](https://github.com/Mintri1199/Magic_Tokens)


# Keyword Document

The keywords are stored as documents in the database.

``` javascript
{
    _id: "5c78b8406db1643a4a5ae4fe",
    title: "Deathtouch",
    definition: "Any amount of damage this deals to a creature is enough to destroy it.",
    "__v": 0
}
```
| Field | Description |
|-------|-------------|
|id       | The item's unique id (assign by the database)            |
|title       | The name of the keyword             |
|definition     | The definition of keyword             |
| __v         | The versionKey of this object            |

# Endpoints

**Base URL** `https://magickeywordapi.herokuapp.com/`

## /api

`/api` will return all the keywords in the API database in a JSON format.

`https://magickeywordapi.herokuapp.com/api`

``` javascript
[
    {
        _id: "5c78b8406db1643a4a5ae4fe",
        title: "Deathtouch",
        definition: "Any amount of damage this deals to a creature is enough to destroy it.",
        "__v": 0
    },
    {
        _id: "5c78b8406db1643a4a5ae4ff",
        title: "Defender",
        definition: "This creature can't attack.",
        "__v": 0
    },
    {
        _id: "5c78b8406db1643a4a5ae500",
        title: "Double strike",
        definition: "This creature deals both first-strike and regular combat damage.",
        "__v": 0
    },
    {
        _id: "5c78b8406db1643a4a5ae501",
        title: "First Strike",
        definition: "This creature deals both first-strike and regular combat damage."
        ,"__v": 0
    }
    ...
```

## /api/keyword/:id

`/api/keyword/:id` will return one keyword based on the unique id given in MongoDB.

Example:
`https://magickeywordapi.herokuapp.com/api/keyword/:id5c78b8406db1643a4a5ae4fe`

Will return the document with an id that match `5c78b8406db1643a4a5ae4fe`

``` javascript
{
    _id: "5c78b8406db1643a4a5ae4fe",
    title: "Deathtouch",
    definition: "Any amount of damage this deals to a creature is enough to destroy it.",
    "__v": 0
}
```

## /api/find

`/api/find` will return either one or multiple keywords depending on the request params (urlencoded).

Example:
`https://magickeywordapi.herokuapp.com/api/find?title=Flying` 

Will return a keyword that has *Flying* as the title.

``` javascript
[
    {
        "_id": "5c7775a6f0d95cc7a272c294",
        "title": "Flying",
        "definition": "This creature can't be blocked except by creatures with flying and/or reach.",
        "__v": 0
    }
]
```

Example of finding many:

`https://magickeywordapi.herokuapp.com/api/find?title=Deathtouch&title=Flying&title=First%20Strike` 

Will return all the keywords that has the match value in the params.
> **Note** If you are getting a keyword that have multiple words like *first strike*, the API will separate them into individual words and find all the keyword that match.
In this case it will return *Double Strike* even though the url did not include it.

``` javascript
[
    {
        "_id": "5c7775a6f0d95cc7a272c290",
        "title": "Deathtouch",
        "definition": "Any amount of damage this deals to a creature is enough to destroy it.",
        "__v": 0
    },
    {
        "_id": "5c7775a6f0d95cc7a272c293",
        "title": "First Strike",
        "definition": "This creature deals both first-strike and regular combat damage.",
        "__v": 0
    },
    {
        "_id": "5c7775a6f0d95cc7a272c294",
        "title": "Flying",
        "definition": "This creature can't be blocked except by creatures with flying and/or reach.",
        "__v": 0
    },
    {
        "_id": "5c7775a6f0d95cc7a272c292",
        "title": "Double strike",
        "definition": "This creature deals both first-strike and regular combat damage.",
        "__v": 0
    }
]

```
