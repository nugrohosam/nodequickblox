'use strict'

const ROLE_PARTNER = 'partner'
const ROLE_CLIENT = 'client'
const ROLE_INSIDER = 'insider'

class UserCreateResponse {

    current_page = null;
    per_page = null;
    total_entries = null;
    items = [];
    
    constructor(data) {
        this.current_page = data.current_page
        this.per_page = data.per_page
        this.total_entries = data.total_entries
        this.items = data.items.map( (item) => {
            return item.user
        })
    }
}

module.exports = UserCreateResponse

