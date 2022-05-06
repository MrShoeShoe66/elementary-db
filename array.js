const { Database } = require('./base')

class arrayDatabase {
    constructor(filename) {
        this.db = Database(filename)
        if (!this.db.has('data')) {
            this.db.set('data', [])
        }
    }

    get(indexValue) {
        try {
            return this.db.get('data')[indexValue]
        } catch (error) {
            throw 'Error geting value'
        }
    }

    set(indexValue, value) {
        try {
            let tmpValue = this.db.get('data')
            tmpValue[indexValue] = value
            this.db.set('data', tmpValue)
        } catch (error) {
            throw 'Error Setting value'
        }
    }

    push(value) {
        try {
            let tmpValue = this.db.get('data')
            tmpValue.push(value)
            this.db.set('data', tmpValue)
        } catch (error) {
            throw 'Error Pushing value'
        }
    }

    find(callback) {
        return this.db.get('data').find(callback)
    }
}

module.exports = {
    arrayDatabase
}