const { app, output } = require('@azure/functions');

const tableOutput = output.table({
    tableName: 'main',
    connection: 'AzureWebJobsStorage'
});

app.storageQueue('queueStorageTriggerTable', {
    queueName: 'main',
    connection: 'AzureWebJobsStorage',
    extraOutputs: [tableOutput],
    handler: (queueItem, context) => {
        context.log('Storage queue function processed work item:', queueItem);

        if (typeof queueItem !== 'object' || queueItem === null)
            throw new Error('Invalid message');

        context.extraOutputs.set(tableOutput, {
            PartitionKey: 'messages',
            RowKey: context.triggerMetadata.id,
            ...queueItem
        });
    }
});
