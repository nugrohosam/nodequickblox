'use strict'

class UserCreateRequest {
    login;
    password;
    email;
    external_user_id;
    facebook_id;
    full_name;
    phone;
    website;
    tag_list;
    custom_data;

    toObject() {
        return {
            user: {
                login: this.login || null,
                password: this.password || null,
                email: this.email || null,
                external_user_id: this.external_user_id || null,
                facebook_id: this.facebook_id || null,
                full_name: this.full_name || null,
                phone: this.phone || null,
                website: this.website || null,
                tag_list: this.tag_list || null,
                custom_data: this.custom_data || null
            }
        }
    }

    toJson() {
        return JSON.stringify(this.request)
    }

    fromJson(json) {
        let data = JSON.parse(json)
        this.login = data.login
        this.password = data.password
        this.email = data.email
        this.external_user_id = data.external_user_id
        this.facebook_id = data.facebook_id
        this.full_name = data.full_name
        this.phone = data.phone
        this.website = data.website
        this.tag_list = data.tag_list
        this.custom_data = data.custom_data
    }
}

module.exports = UserCreateRequest

