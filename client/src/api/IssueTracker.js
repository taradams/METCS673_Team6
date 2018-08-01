function getIssueCards(callback){
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

function addNewIssue(issue, callback){
    fetch("/api/tasks", {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(issue),
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

export {getIssueCards, addNewIssue}