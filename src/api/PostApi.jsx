import axios from "axios";
import "../App.css";

const api = axios.create({
      baseURL: "https://jsonplaceholder.typicode.com"
});

// get method
export const getPost=()=>{
      return api("/posts")
}
// get Delete

export const deletePost=(id)=>{
      return api.delete(`/posts/${id}`);
}
//Create Post
export const createPost=(post)=>{
      return api.post('/posts',post);

}
//update method
// export const updatePost=(id,post)=>{
//       return api.put(`/posts/${id}`,post)
// }
export const updatePost = (id, post) => {
  return api.put(`/posts/${id}`, post);
};