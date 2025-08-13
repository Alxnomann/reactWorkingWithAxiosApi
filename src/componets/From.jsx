import React, { useEffect, useState } from 'react'
import { createPost, updatePost } from '../api/PostApi';

export const Form = ({ data, setData, update, setupdate }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: ""
  });

  const isEmpty = Object.keys(update).length === 0;

  useEffect(() => {
    if (!isEmpty) {
      setAddData({
        title: update.title || "",
        body: update.body || ""
      })
    }
  }, [update, isEmpty])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addPostData = async () => {
    try {
      const res = await createPost(addData)
      if (res.status === 201) {
        setData([...data, res.data])
        setAddData({ title: "", body: "" })
      }
    } catch (error) {
      console.log("Error in addPostData", error);
    }
  }

  const updatePostData = async () => {
    try {
      const res = await updatePost(update.id, addData) // Changed from 'data' to 'addData'
      if (res.status === 200) {
        // Update the specific post in the data array
        setData(prev => 
          prev.map(item => 
            item.id === update.id ? { ...item, ...res.data } : item
          )
        )
        setAddData({ title: "", body: "" })
        setupdate({})
      }
    } catch (error) {
      console.log("error in UpdateData", error);
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor='title'></label>
        <input
          type='text'
          placeholder='Add Title'
          autoComplete='off'
          name='title'
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor='body'></label>
        <input
          type='text'
          placeholder='Add Post'
          autoComplete='off'
          id='body'
          name='body'
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
      <button type='submit' value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  )
}

export default Form


