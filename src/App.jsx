import React,{useState,useEffect} from "react";
import axios from "axios";
import {toast} from 'react-toastify'

const App = () => {
  const [image,setImage]=useState("")
  const [products,setProducts]=useState([])

  function handelImage(event){
    let file = event.target.files[0]
    if(file.size>100000){
      toast.error("choose file size less than 100KB")
      return;
    
  }

  let reader = new FileReader()
  reader.onloadend = () =>{
    setImage(reader.result)
  }
  reader.readAsDataURL(file)
}

function fetchData(){
  axios.get("http://localhost:3000/product_image")
  .then(x=>setProducts(x.data || []))
  .catch(err=>{
    console.log(err)
    setProducts([])
  })
}
useEffect(()=>{
  fetchData()
},[])

function handelForm(e){
  e.preventDefault()
  const imageData ={image}
  axios.post("http://localhost:3000/product_image",imageData)
  .then(()=>{
    toast.success("Uploaded")
    fetchData()
  })
  .catch(err=>toast.error("Failed to Upload"))
}
  

      
  return(
    <>
    <form onSubmit={handelForm}>
      <input type="file" onChange={handelImage}/><br/>
      <button>Upload</button>
    </form>

    <center>Products</center>
    {products?.map((x, index)=>{
      return <img key={index} src={x.image} height={"200px"} alt=""/>
    })}
    </>
  )
}
export default App;