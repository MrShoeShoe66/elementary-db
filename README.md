# elementary-db, A not so basic json database

A baisc json database system for Node.js

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

And note use this to init a database that suports old files

```js
const Database = require('elementary-db');
const db = new Database('database', {
  "useOld": true
});
```

## Config

To set any config use the `.configure` function

### Example

Set autosave to false use this command

```js
db.configure('autosave', false)
```

### All Config Settings

 - AutoSave
   - Save a project to disk after evey change
   - Value Type: True/False
   - Default Value: True
   - Setting value: 'autosave'
 - DontSave
   - Disable The ability to save to the drive, only load a file but dont save to it
   - Value Type: True/False
   - Default Value: False
   - Setting value: 'dontsave'

Info about data encryption is found at line 155

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

## Convert from .json to .edb

use this function to convert a .json file to the newest version of an .edb version

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

# Encryption

To inetalise a encrypted database use this using this to setup the database object

```js
const Database = require('elementary-db');
const db = new Database('database', {
  "encrypted": true,
  "encryptedKey": 'encryption key'
});
```

Then the database will work like normal, now the database just has an extra layer of protection

And as a side note, we HIGHLY recomend you turn off autosave if you have this enabled, it is on by default but the automatic saving to the disk can slow down other processes 

### IMPORTANT NOTE:

The key MUST be at least 256 bits long or 32 charicters long as a minimum, but if you are very worryed about your user data and or procecsing time, we would recomend you encrypt and decrypt your own private data or use both for an extra player of protection

# Remote

Coming soon :D

if you want to help develop it, visit the  [./remote.js](./remote.js) file