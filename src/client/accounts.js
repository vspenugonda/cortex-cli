/*
 * Copyright 2018 Cognitive Scale, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the “License”);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an “AS IS” BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const request = require('superagent');
const debug = require('debug')('cortex:cli');

module.exports = class Accounts {

    constructor(cortexUrl) {
        this.cortexUrl = cortexUrl;
        this.endpoint = `${cortexUrl}/v2/accounts`;
        this.groupsEndpoint = `${this.endpoint}/groups`;
        this.resourcesEndpoint = `${this.endpoint}/resources`;
    }

    listGroups(token) {
        const endpoint = this.groupsEndpoint;
        debug('listGroups => %s', endpoint);
        return request
            .get(endpoint)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                if (res.ok) {
                    return {success: true, result: res.body};
                }
                return {success: false, status: res.status, message: res.body};
            });
    }

    describeGroup(token, groupName) {
        const endpoint = `${this.groupsEndpoint}/${groupName}`;
        debug('describeGroup($s) => %s', groupName, endpoint);
        return request
            .get(endpoint)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                if (res.ok) {
                    return {success: true, result: res.body};
                }
                return {success: false, status: res.status, message: res.body};
            });
    }

    createGroup(token, groupName, description) {
        const endpoint = this.groupsEndpoint;
        debug('createGroup(%s) => %s', groupName, endpoint);
        let body = {
            name: groupName
        };
        if (description)
            body.description = description;
        return request
            .post(endpoint)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .then((res) => {
                if (res.ok) {
                    return {success: true, result: res.body};
                }
                return {success: false, status: res.status, message: res.body};
            });
    }

    addMembersToGroup(token, groupName, members) {
        const endpoint = `${this.groupsEndpoint}/${groupName}/members`;
        debug('addMembersToGroup => %s', endpoint);
        return request
            .put(endpoint)
            .set('Authorization', `Bearer ${token}`)
            .send({
                members: members
            })
            .then((res) => {
                if (res.ok) {
                    return {success: true, result: res.body};
                }
                return {success: false, status: res.status, message: res.body};
            });
    }

    deleteGroup(token, groupName) {
        const endpoint = `${this.groupsEndpoint}/${groupName}`;
        debug('deleteGroup($s) => %s', groupName, endpoint);
        return request
            .delete(endpoint)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                if (res.ok) {
                    return {success: true, result: res.body};
                }
                return {success: false, status: res.status, message: res.body};
            });
    }

    removeMembersFromGroup(token, groupName, members) {
        const endpoint = `${this.groupsEndpoint}/${groupName}/members`;
        debug('removeMembersFromGroup($s) => %s', groupName, endpoint);
        return request
            .delete(endpoint)
            .set('Authorization', `Bearer ${token}`)
            .send({
                members: members
            })
            .then((res) => {
                if (res.ok) {
                    return {success: true, result: res.body};
                }
                return {success: false, status: res.status, message: res.body};
            });
    }

    registerResource(token, resourceName, description, access) {
        const endpoint = this.resourcesEndpoint;
        debug('registerResource(%s) => %s', resourceName, endpoint);
        let body = {
            name: resourceName
        };
        if (description)
            body.description = description;
        if (access)
            body.access = access;
        return request
            .post(endpoint)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .then((res) => {
                if (res.ok) {
                    return {success: true, result: res.body};
                }
                return {success: false, status: res.status, message: res.body};
            });
    }

    grantGroupAccessToResource(token, resourceId, groupName) {
        const endpoint = `${this.resourcesEndpoint}/${resourceId}/access`;
        debug('grantGroupAccessToResource(%s) => %s', resourceId, endpoint);
        return request
            .put(endpoint)
            .set('Authorization', `Bearer ${token}`)
            .send({
                groupId: groupName
            })
            .then((res) => {
                if (res.ok) {
                    return {success: true, result: res.body};
                }
                return {success: false, status: res.status, message: res.body};
            });
    }

    // TODO: To be implemented
    // listResources(token) {
    //     const endpoint = this.resourcesEndpoint;
    //     debug('listResources => %s', endpoint);
    //     return request
    //         .get(endpoint)
    //         .set('Authorization', `Bearer ${token}`)
    //         .then((res) => {
    //             if (res.ok) {
    //                 return {success: true, result: res.body};
    //             }
    //             return {success: false, status: res.status, message: res.body};
    //         });
    // }

    // TODO: To be implemented
    // unregisterResource(token, resourceName) {
    //     const endpoint = `${this.resourcesEndpoint}/${resourceName}`;
    //     debug('unregisterResource(%s) => %s', resourceName, endpoint);
    //     return request
    //         .delete(endpoint)
    //         .set('Authorization', `Bearer ${token}`)
    //         .then((res) => {
    //             if (res.ok) {
    //                 return {success: true, result: res.body};
    //             }
    //             return {success: false, status: res.status, message: res.body};
    //         });
    // }

    // TODO: To be implemented
    // revokeGroupAccessToResource(token, resourceId) {
    //     const endpoint = `${this.resourcesEndpoint}/${resourceId}/access`;
    //     debug('revokeGroupAccessToResource(%s) => %s', resourceId, endpoint);
    //     return request
    //         .delete(endpoint)
    //         .set('Authorization', `Bearer ${token}`)
    //         .then((res) => {
    //             if (res.ok) {
    //                 return {success: true, result: res.body};
    //             }
    //             return {success: false, status: res.status, message: res.body};
    //         });
    // }

};
