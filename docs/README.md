# Keyword Object
``` javascript
{
    _id: "5c78b8406db1643a4a5ae4fe",
    title: "Deathtouch",
    definition: "Any amount of damage this deals to a creature is enough to destroy it.",
    "__v": 0
}
```

# Endpoints

### /api
`/api/` will return all the keywords in the API database in a JSON format.

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

### /api/keyword/:id
`/api/keyword/:id` will return one keyword based on the id given in MongoDB.
> Example: Get`/api/keyword/:id5c78b8406db1643a4a5ae4fe` will return

``` javascript
{
    _id: "5c78b8406db1643a4a5ae4fe",
    title: "Deathtouch",
    definition: "Any amount of damage this deals to a creature is enough to destroy it.",
    "__v": 0
}
```

### /api/find
`/api/find` will return either one or multiple keywords depending on the request params (urlencoded).
Example: `/api/find?title=Flying` will return a keyword that has Flying as the title.

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

Example of finding many: `/api/find?title=Deathtouch&title=Flying&title=First%20Strike` will return all the keywords that has the match value in the params.
> **Note** If you are getting a keyword that have multiple words like *first strike*, the api will separate them into individual words and find all the keyword that match.
In this case it will return *Double Strike* even though the url didn't ask for it.

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
