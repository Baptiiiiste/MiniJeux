
module.exports = {

    async get(uri) {
        let data = await fetch(uri, {method: 'GET'});
        data = await data.json();
        return data;
    },

    async post(uri, body) {
        return fetch(uri, {
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .catch(err => err);
    },

    async delete(uri){
        return fetch(uri, {
            method: "DELETE"
        })
            .then(response => response.json())
            .catch(err => err);
    },

    async put(uri, body){
        return fetch(uri, {
            method: "PUT",
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .catch(err => err);
    }

    
}