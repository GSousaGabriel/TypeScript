let logged

function send(data: string){
    console.log(data)
    logged= true
    console.log(logged) 
}

send('data sent')