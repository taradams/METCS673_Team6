function editColumnTitle(id, value, callback) {
    fetch("/api/columns/" + id, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(value),
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

export { editColumnTitle };