
const res= document.getElementById("response")
//const API_KEY ='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'
//const API_KEY = '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'
console.log(key)
async function submit(){

    //For switching the screen
   
    document.getElementById('home-screen').style.display='none'
    document.getElementById('response-screen').style.display='block'
    

    const input= document.getElementById("input").value

    // for displaying the question
    const question = document.getElementById('question')
    question.innerHTML = input

    //for clearing the input field
    document.getElementById("input").value=""


    //FOr fetching data 
    const options ={
        method:'POST',
        headers: {
            'Authorization':`Bearer ${key}`,
            'Content-Type':`application/json`
        },
        body : JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: input}],
            
        })
          
    }
    try{
        res.innerHTML = "Loading..."
        const response = await fetch('https://api.openai.com/v1/chat/completions',options)
        const data = await response.json()
        console.log(data.choices[0].message.content)        
        res.innerHTML = data.choices[0].message.content

        if(data.choices[0].message.content){
            const para = document.createElement('p')
            para.innerHTML = document.getElementById("input").value
            const history = document.getElementById('history')
            history.append(para)
            para.innerHTML = input
            para.addEventListener('click',function(){
                document.getElementById("input").value = para.innerHTML
            })
        }
    }catch (error){
        res.innerHTML = 'Loading Error!, Please Try again'
        console.log(error)
    }

    
}


//For new chaht

function newchat(){
    document.getElementById('home-screen').style.display='flex'
    document.getElementById('response-screen').style.display='none'
}


document.getElementById("submit").addEventListener('click',function(){
    if( document.getElementById("input").value==""){
       alert('Enter message First')
     }
     else{
        submit()
     }
})

//For responsive navbar

function navbar(){
    document.getElementById('left-nav').style.display = 'inline'
    document.getElementById('close-btn').style.display = 'inline'
    document.getElementById('right-screen').addEventListener('click',function(){
        document.getElementById('left-nav').style.display = 'none'
        document.getElementById('close-btn').style.display = 'none'
    })
    
}

function closemenu(){
    document.getElementById('left-nav').style.display = 'none'
    document.getElementById('close-btn').style.display = 'none'
    

}
