import { useState, useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import Alert from "@cloudscape-design/components/alert";
import { Textarea } from "@cloudscape-design/components";

const AddTaskModal = ({ addTask }) => {
  const { isModalVisible, setModalVisibility } =
    useContext(GlobalContext);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

  const dismissModal = () => {
    setModalVisibility(false);
  };

  const handleInputChange = (inputBar, event) => {
    if(inputBar === "title")  
      setTaskTitle(event.detail.value)
    else if(inputBar === "desc")
      setTaskDesc(event.detail.value);
  }

  const generate3DigitRandomNumber = () => {
    return Math.floor(Math.random()*(999-100+1)+100);
}

  const saveTask = () => {
    addTask({ id: "Task" + generate3DigitRandomNumber() ,title : taskTitle, description : taskDesc});
  }

  return (
    <>
      <Modal
        visible="true"
        onDismiss={dismissModal}
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={dismissModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={saveTask}>
               Add Task
              </Button>
            </SpaceBetween>
          </Box>
        }
        header="Add Task"
      >
        <SpaceBetween size="xs">
          <FormField label="Task Title">
            <Input value={taskTitle} onChange={(e) => handleInputChange("title", e)}/>
          </FormField>
          <FormField label="Task Description">
            <Textarea value={taskDesc} onChange={(e) => handleInputChange("desc", e)}/>
          </FormField>

          {/* <Alert
            statusIconAriaLabel="Success"
            type="success"
            visible={showSuccessAlert}
          >
            To Do added successfully.
          </Alert>

          <Alert
            statusIconAriaLabel="Success"
            type="error"
            visible={showErrorAlert}
          >
            Please enter text to create a to do.
          </Alert> */}
        </SpaceBetween>
      </Modal>
    </>
  );
};

export default AddTaskModal;
