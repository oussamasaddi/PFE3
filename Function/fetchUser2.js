


export const fetchUser2 = (id) => {
    fetch(`http://10.0.2.2:3000/user/${id}`)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            if(responseJson != null){
                                data = responseJson[0];
                                return data ;
                            }
                        
                        })
                        .catch((err) => {
                        console.log(err);
                        });

}

