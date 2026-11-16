const { app, output } = require('@azure/functions');

const queueOutput = output.storageQueue({
    queueName: 'main',
    connection: 'AzureWebJobsStorage'
});

app.http('httpTriggerQueueStorage', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    extraOutputs: [queueOutput],
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const body = await request.json();
        context.extraOutputs.set(queueOutput, body);

        return { status: 200 };
    }
});
