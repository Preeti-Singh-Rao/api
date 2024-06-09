function getChocolates (){fetch('https://crudcrud.com/api/c328abe144b84769858b0256888c40a1/chocalates' )
.then((response)=>{
    response.json()
    .then((response)=>{
        console.log(response)
        let div=document.getElementById('mydiv')
        div.innerHTML= ""

        response.map((item)=>{
            
            let liTag=document.createElement('li');
            let div1=document.createElement('div');
            let div2=document.createElement('div');
            let div3=document.createElement('div');
            let div4=document.createElement('div');

            let buy1=document.createElement('button')
            buy1.innerText='Buy1'
            buy1.addEventListener('click',function(){updateChocolateQuantity(item,1)})
            let buy2=document.createElement('button')
            buy2.innerText='Buy2'
            buy2.addEventListener('click',function(){updateChocolateQuantity(item, 2)})
            let buy3=document.createElement('button')
            buy3.innerText='Buy3'
            buy3.addEventListener('click',function(){updateChocolateQuantity(item, 3)})
            
            
            div1.innerHTML=item.candyname
            div2.innerHTML=item.discription
            div3.innerHTML=item.quantity
            div4.innerHTML=item.price

            liTag.appendChild(div1)
            liTag.appendChild(div2)
            liTag.appendChild(div3)
            liTag.appendChild(div4)
            liTag.appendChild(buy1)
            liTag.appendChild(buy2)
            liTag.appendChild(buy3)
            div.appendChild(liTag)
            
            
            
        })
    })
})
.catch((err)=>{
    console.log(err);
})}

function addItem(event){
    event.preventDefault()

    let candyname=document.getElementById('candyname');
    let candyVal=candyname.value
    let discription=document.getElementById('discription')
    let discripVal=discription.value;
    let quantity=document.getElementById('quantity')
    let quantityVal=quantity.value
    let price=document.getElementById('price')
    let priceVal=price.value

    console.log(candyname,discription,quantity,price)

    fetch('https://crudcrud.com/api/c328abe144b84769858b0256888c40a1/chocalates', {
       method:"POST",
          body: JSON.stringify({
            candyname:candyVal,
            discription:discripVal,
            quantity:quantityVal,
            price:priceVal
          }),
          
          headers: { 
            "Content-type": "application/json; charset=UTF-8"
        }
        
        })
       
          .then((response) => response.json())
          .then((json) => {
            
                      let div=document.getElementById('mydiv')
                      let liTag=document.createElement('li');
                      let div1=document.createElement('div');
                      let div2=document.createElement('div');
                      let div3=document.createElement('div');
                      let div4=document.createElement('div');
                      
                      div1.innerHTML=json.candyname
                      div2.innerHTML=json.discription
                      div3.innerHTML=json.quantity
                      div4.innerHTML=json.price
                      

                      liTag.appendChild(div1)
                      liTag.appendChild(div2)
                      liTag.appendChild(div3)
                      liTag.appendChild(div4)
                      div.appendChild(liTag)
                      })
                      .catch((error)=>{
                    console.log(error)
                      })  
}


function updateChocolateQuantity(item, number){
// console.log(item,number);

    let bodyobj = {
        candyname:item.candyname,
        discription:item.discription,
        price:item.price,
        quantity:item.quantity
    }
    //   need quantity
    bodyobj.quantity = `${Number(bodyobj.quantity) - number}`
    console.log(bodyobj);
    fetch(`https://crudcrud.com/api/c328abe144b84769858b0256888c40a1/chocalates/${item._id}` , {
        method:"PUT",
           body: JSON.stringify(bodyobj),
           headers: { 
             "Content-type": "application/json; charset=UTF-8"
         }
         
         })
        
           .then((response) => {response.json(); getChocolates()}) 
           .then((json) => {
            getChocolates()
           })
           .catch((error)=>{
            console.log(error)
           })
}

getChocolates()