import React, { useEffect, useState } from 'react'
import { deletePost, getPost, } from '../api/PostApi';
import "../App.css";
import From from './From';

function Posts() {
      const [ data, setData] = useState([])
      const [update, setupdate] = useState({})
      
           useEffect(() => {
           const fetchPost =async()=>{
            const res = await getPost();
            setData((res.data));
       }
           fetchPost();
      }, [])
      //Delete Post
      const handleDelete=async(id)=>{
     try {
        const res = await  deletePost(id)
       if(res.status ===200){
            const newUpdatedPost = data.filter((prev=>{
                  return prev.id !== id
            }))
            setData(newUpdatedPost)
       }
     } catch (error) {
console.log("api error",error);
}
}
const handleUpdate=(val)=>setupdate(val);
           
  return (
     <>
       <section className="section-form">
           <From
           data={data}
           setData={setData}
           update={update}
           setupdate={setupdate}
           />
       </section>
 <section className="section-post">
<ol>
      
      {data.map((val)=>{
            const {id,title,body}=val;
           return <li key={id}>
           <p>Title:{title}</p>
           <p>News:{body}</p>
           <button onClick={()=>handleUpdate(val)}>Edit</button>
           <button className="btn-delete" onClick={()=>handleDelete(id)}>Delete</button>
             </li>
            })}
</ol>
 </section>
     </>
  )
}

export default Posts


