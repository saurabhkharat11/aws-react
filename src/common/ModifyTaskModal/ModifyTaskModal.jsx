import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import Alert from "@cloudscape-design/components/alert";
import { Textarea } from "@cloudscape-design/components";

const ModifyTaskModal = ({ taskToUpdate, modifyTask }) => {
  const { isModalVisible, setModalVisibility } = useContext(GlobalContext);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

  const dismissModal = () => {
    setModalVisibility(false);
  };

  const handleInputChange = (inputBar, event) => {
    if (inputBar === "title") setTaskTitle(event.detail.value);
    else if (inputBar === "desc") setTaskDesc(event.detail.value);
  };

  const updateTask = () => {
    modifyTask({
      id: taskToUpdate.id,
      title: taskTitle,
      description: taskDesc,
    });
  };

  useEffect(() => {
    setTaskTitle(taskToUpdate.title);
    setTaskDesc(taskToUpdate.description);
  }, []);

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
              <Button variant="primary" onClick={updateTask}>
                Update Task
              </Button>
            </SpaceBetween>
          </Box>
        }
        header="Update Task"
      >
        <SpaceBetween size="xs">
          <FormField label="Task Title">
            <Input
              value={taskTitle}
              onChange={(e) => handleInputChange("title", e)}
            />
          </FormField>
          <FormField label="Task Description">
            <Textarea
              value={taskDesc}
              onChange={(e) => handleInputChange("desc", e)}
            />
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

export default ModifyTaskModal;
