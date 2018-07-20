function getTaskByColumnID(id, callback) {
    fetch("/api/tasks/" + id, {
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

function getTaskWithoutColumnID(callback) {
    fetch("/api/tasks/", {
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

function addCard(card, callback) {
    fetch("/api/tasks", {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(card),
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

function deleteCard(id, callback) {
    fetch("/api/tasks/" + id, {
        method: 'DELETE',
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

function editCard(id, values, callback) {
    fetch("/api/tasks/" + id, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(values),
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

export { getTaskByColumnID, getTaskWithoutColumnID, addCard, deleteCard, editCard };