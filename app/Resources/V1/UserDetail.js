'use strict'

class UserDetail {

    resource
    request
    response
    
    constructor(resource, { request, response }) {
        this.request = request
        this.resource = resource
    }

    toObject(){
        return {
            username: this.resource.username || null,
            email: this.resource.email || null,
            fullname: this.resource.fullname || null,
            phone: this.resource.phone || null,
            user_quickblox_id: this.resource.user_quickblox_id || null
        }
    }
}

module.exports = UserDetail