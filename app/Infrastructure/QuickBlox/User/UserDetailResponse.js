'use strict'

class UserDetailResponse {
    id;
    full_name;
    email;
    login;
    phone;
    website;
    created_at;
    updated_at;
    last_request_at;
    external_user_id;
    facebook_id;
    twitter_id;
    blob_id;
    custom_data;
    age_over16;
    allow_statistics_analysis;
    allow_sales_activities;
    parents_contacts;
    user_tags;

    constructor(data) {
        this.id = data.id
        this.full_name = data.full_name
        this.email = data.email
        this.login = data.login
        this.phone = data.phone
        this.website = data.website
        this.created_at = data.created_at
        this.updated_at = data.updated_at
        this.last_request_at = data.last_request_at
        this.external_user_id = data.external_user_id
        this.facebook_id = data.facebook_id
        this.twitter_id = data.twitter_id
        this.blob_id = data.blob_id
        this.custom_data = data.custom_data
        this.age_over16 = data.age_over16
        this.allow_statistics_analysis = data.allow_statistics_analysis
        this.allow_sales_activities = data.allow_sales_activities
        this.parents_contacts = data.parents_contacts
        this.user_tags = data.user_tags
    }
}

module.exports = UserDetailResponse

