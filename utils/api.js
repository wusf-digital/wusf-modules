class ApiRequest {
    constructor(url) {
        this.url = url
    }

    async get() {
        try {
            let response = await fetch(this.url)
            response = response.json()
            return response
        } catch(error) {
            throw new Error(error)
        }
    }
}

export default ApiRequest