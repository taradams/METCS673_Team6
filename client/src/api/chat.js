function sendMessage(message, callback) {
    fetch("/api/chat/", {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(message),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            'Access-Control-Allow-Origin': '*'
        } 
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        callback(json);   
    }); 
}

function retrieveMessages(callback) {
    fetch("/api/chat/", {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            callback(json);
        });
}
export { sendMessage, retrieveMessages }; 