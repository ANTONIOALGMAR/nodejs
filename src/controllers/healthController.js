const healthCheck = (request, reply)=> {
    reply.send({message: "Server is up and running. "});
}

module.exports = {
    healthCheck
}