
export default class useFetch {

    async get(uri) {
        return fetch(uri)
            .then(response => response.json())
            .catch(err => err);
    }

    async post(uri, body) {
        return fetch(uri, {
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .catch(err => err);
    }

    async delete(uri){
        return fetch(uri, {
            method: "DELETE"
        })
            .then(response => response.json())
            .catch(err => err);
    }

    async put(uri, body){
        return fetch(uri, {
            method: "PUT",
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .catch(err => err);
    }

    
}