function EditIssue(editTask, id, callback) {
    fetch("/api/tasks/" + id, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(editTask),
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

    // alert("Submitted!");
}

export {EditIssue}