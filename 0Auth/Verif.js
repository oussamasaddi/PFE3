

  export  const Verif =  (id) => {
    
    
     fetch(`http://10.0.2.2:3000/user/${id}`)
    .then((response) => response.json())
    .then((responseJson) => {
        if(responseJson != null){
             
             
             return responseJson;
             
        }else{
            return null
        }
    
    })
    .catch((err) => {
    console.log(err);
    });



        
    
}


