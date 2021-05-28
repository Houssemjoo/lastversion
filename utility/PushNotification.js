function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res
}

async function sendPushNotification({ expoPushToken, title, body }) {
        const TokensPerReq = sliceIntoChunks(expoPushToken, 100)

        const promises = TokensPerReq.map(async (tokens) => {
            const message = {
                to: tokens,
                sound: 'default',
                title: `${title}`,
                body: `${body}`,
                data: { someData: `${body}` },
            }
            
            await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Accept-encoding': 'gzip, deflate',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
              });  
        })

        await Promise.all(promises)
}

export { sendPushNotification }