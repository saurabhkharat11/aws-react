import "./Home.css";
import TopNav from "../../common/TopNav/TopNav";
import AddTaskModal from "../../common/AddTaskModal/AddTaskModal";
import ModifyTaskModal from "../../common/ModifyTaskModal/ModifyTaskModal";
import { GlobalContext } from "../../contexts/GlobalContext";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import Button from "@cloudscape-design/components/button";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Alert from "@cloudscape-design/components/alert";
import { useAddTask, useDeleteTask, useGetTasks, useUpdateTask } from "../../services/api";
import { useState, useContext, useEffect } from "react";

export default function Home() {
  const { getResponse, callGetApi } = useGetTasks();
  const { addTaskResponse, callPostApi } = useAddTask();
  const { updateTaskResponse, callPutApi } = useUpdateTask();
  const { deleteTaskResponse, callDeleteApi} = useDeleteTask();
  const { isModalVisible, setModalVisibility } = useContext(GlobalContext);
  const [taskToUpdate, setTaskToUpdate] = useState("");
  const [mode, setMode] = useState("");



  useEffect(() => {
    callGetApi();
  }, [addTaskResponse, updateTaskResponse, deleteTaskResponse, callGetApi]);


  const openTaskModal = (mode, itemToUpdate = undefined) => {
    setMode(mode);
    if (itemToUpdate) setTaskToUpdate(itemToUpdate);
    else {
      setTaskToUpdate("");
    }
    setModalVisibility(true);
  };

  const addTask = (newTask) => {
    callPostApi(newTask);
  };

  const removeTask = (id) => {
    callDeleteApi(id);  
  };

  const modifyTask = (task) => {
    callPutApi(task);
  };

  return (
    <div>
      {isModalVisible && mode === "create" && (
        <AddTaskModal addTask={addTask} />
      )}
      {isModalVisible && mode === "edit" && (
        <ModifyTaskModal taskToUpdate={taskToUpdate} modifyTask={modifyTask} />
      )}
      <TopNav />
      <div className="main-container flex-center-horizontal">
        <div className="tasks-container">
          <Container
            fitHeight
            header={
              <Header
                variant="h2"
                actions={
                  <SpaceBetween direction="horizontal" size="xs">
                    <Button onClick={() => openTaskModal("create")}>
                      Create Task
                    </Button>
                  </SpaceBetween>
                }
              >
                My Tasks
              </Header>
            }
          >
            <div className="h-60">
              {getResponse && getResponse.Items?.length === 0 && (
                <Alert header="No Tasks Set">
                  Click 'Add Task' to create a Task
                </Alert>
              )}
              {getResponse &&
                getResponse.Items.map((task, index) => {
                  return (
                    <div key={index} className="mx-2">
                      <Container>
                        <div className="flex-between-horizontal">
                          <div>
                            <h3>
                              <strong>{task.title}</strong>
                            </h3>
                            <p>
                              <strong>{task.id}</strong>
                            </p>
                            <p>{task.description}</p>
                          </div>

                          <div className="flex-center-vertical">
                            <Button
                              iconName="edit"
                              variant="icon"
                              onClick={() => openTaskModal("edit", task)}
                            />
                            <Button
                              iconName="remove"
                              variant="icon"
                              onClick={() => removeTask(task.id)}
                            />
                          </div>
                        </div>
                      </Container>
                    </div>
                  );
                })}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
