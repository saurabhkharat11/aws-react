import { useState, useCallback } from "react";

const API_URL = "https://nw678sfec9.execute-api.ap-south-1.amazonaws.com/dev";

let myHeaders = new Headers();

myHeaders.append("Content-Type", "application/json");

export const useGetTasks = () => {
  const [getResponse, setGetResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const callGetApi = useCallback(async () => {
    setIsLoading(true);
    const raw = JSON.stringify({ method: "GET" });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      if (JSON.parse(json.body).Items) {
        setGetResponse(JSON.parse(json.body));
      }
      console.log(JSON.parse(json.body));
    } catch (error) {
      console.error(error.message);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  },[]);

  return { getResponse, isLoading, error, callGetApi };
};

export const useAddTask = (task) => {
  const [addTaskResponse, setAddTaskResponse] = useState(null);
  const [addTaskError, setAddTaskError] = useState(null);

  const callPostApi = async (task) => {
    const raw = JSON.stringify({
      method: "POST",
      id: task.id,
      title: task.title,
      description: task.description,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      setAddTaskResponse(JSON.parse(json.body));

      console.log(JSON.parse(json.body));
    } catch (error) {
      setAddTaskError(error.message);
      console.error(error.message);
    }
  };

  return { addTaskResponse, addTaskError, callPostApi };
};

export const useUpdateTask = (task) => {
    const [updateTaskResponse, setUpdateTaskResponse] = useState(null);
    const [updateTaskError, setUpdateTaskError] = useState(null);
  
    const callPutApi = async (task) => {
      const raw = JSON.stringify({
        method: "PUT",
        id: task.id,
        title: task.title,
        description: task.description,
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };
  
      try {
        const response = await fetch(API_URL, requestOptions);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
  
        const json = await response.json();
  
        setUpdateTaskResponse(JSON.parse(json.body));
  
        console.log(JSON.parse(json.body));
      } catch (error) {
        setUpdateTaskError(error.message);
        console.error(error.message);
      }
    };
  
    return { updateTaskResponse, callPutApi, updateTaskError };
  };


  export const useDeleteTask = (id) => {
    const [deleteTaskResponse, setDeleteTaskResponse] = useState(null);
    const [deleteTaskError, setDeleteTaskError] = useState(null);
  
    const callDeleteApi = async (id) => {
      const raw = JSON.stringify({
        method: "DELETE",
        id: id,
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };
  
      try {
        const response = await fetch(API_URL, requestOptions);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
  
        const json = await response.json();
  
        setDeleteTaskResponse(JSON.parse(json.body));
  
        console.log(JSON.parse(json.body));
      } catch (error) {
        setDeleteTaskError(error.message);
        console.error(error.message);
      }
    };
  
    return { deleteTaskResponse, callDeleteApi, deleteTaskError };
  };
  
