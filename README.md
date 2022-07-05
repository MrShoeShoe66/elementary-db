# elementary-db, A simple json database

A baisc json database system for Node.js

# NOTE!

After update V2.0.0 .json files are no longer suported! To update an old .json file to a new .edb file, use the following command

```js
Database.convertToNew(filename)
```

It will create a new file with the same name but with the .edb file extention insted of the .json file extention

# Install

use this command to install

```shell
npm install elementary-db
```

# Usage

## Setup

To setup use the following

```js
const Database = require('elementary-db');
const db = new Database('database');
```

Or you can do this

```js
const Database = require('elementary-db');
const db = Database.init('database');
```

## Config

To set any config use the `.configure` function

### Example

Set autosave to false use this command

```js
db.configure('autosave', false)
```

**NOTE**: More configuration will be avalible in a latter update! Check back soon!

## Usage

### Get data

to grab data use the `.get` function

```js
db.get(key)
```

### Set data

Use `.set` to set data

```js
db.set(key, value)
```

### Delete data

To delete data use `.del`

```js
db.del(key)
```

### Get keys

To grab the keys use this

```js
db.keys()
```

### Has data

To check if a key use `.has`

```js
db.has(key)
```

### Save to disk

To save the data to the json source use `.save`

```js
db.save()
```

**NOTE**: You don't need to use this command unless you set 'autosave' to false

### Get or set all data

To get all data use `.getAll`

```js
db.getAll()
```

To setall data use `.setAll`

```js
db.setAll(newJsonData)
```

# Array 

Unfortunetly We are no longer suporting the array database format, sorry for the inconvenionce to those using this format, we have provided a aternative method for similar results bellow this message

```js
const Backup = new Database('database')
if (Backup.has('data')) {
   const array = Backup.get('data')
} else {
   Backup.set('data', [])
   const array = Backup.get('data')
}
```

Again, sorry for the inconvenience. 

# Remote

Coming soon :D