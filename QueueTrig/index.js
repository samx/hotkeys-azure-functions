let request = require('request');

module.exports = function (context, myQueueItem) {
    context.log('JavaScript queue trigger function processed work item', myQueueItem);
    context.log('dequeueCount =', context.bindingData.dequeueCount);
    let myQueueItemObject = myQueueItem;
    
    if (typeof myQueueItemObject === 'string') {
        myQueueItemObject = JSON.parse(myQueueItem);
    }

    request({
        url: 'http://hotkeys.azurewebsites.net/resubscribeChannel',
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        json: { "channel_id": myQueueItemObject.channel_id }
    }, function (error, resp, body) {
        context.log(body);
        context.done();
    }
    );
    /*
    context.log('JavaScript queue trigger function processed work item', myQueueItem);
    context.log('Node.js queue trigger function processed work item', context.bindings.myQueueItem);
    context.log('queueTrigger =', context.bindingData.queueTrigger);
    context.log('expirationTime =', context.bindingData.expirationTime);
    context.log('insertionTime =', context.bindingData.insertionTime);
    context.log('nextVisibleTime =', context.bindingData.nextVisibleTime);
    context.log('id =', context.bindingData.id);
    context.log('popReceipt =', context.bindingData.popReceipt);
    context.log('dequeueCount =', context.bindingData.dequeueCount);


    
        if (Math.floor((Math.random() * 2) + 1) == 1) {
            context.log('test1 - failed to function, DO NOT dequeue');
            context.done('test2 - failed to function, DO NOT dequeue');
        } else {
            context.done();
        }
    */
};