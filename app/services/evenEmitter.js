var eventEmitter = function() {
    var actions = new Array();
    this.subscribe = function(callback) {
        actions.push(callback);
    }
    this.emit = function(data) {
        actions.forEach(action => {
            action(data);
        });
    }
}