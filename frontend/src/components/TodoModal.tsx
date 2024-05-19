import React, { useState } from "react";
import styles from "../styles/modules/modal.module.css";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Buttons/Button";
import { v4 as uuid } from "uuid";

function TodoModal({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [name, setName] = useState("");
  const [description, setDescripton] = useState("");
  const [date, setDate] = useState("2024-05-19T12:30");

  const hangleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, description, date });

    const activityType = "task"
    const data = {
      name,
      description,
      date,
      activityType,
    };
    const url = "http://127.0.0.1:5000/create_activity"
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 200){
      const message = await response.json()
      alert(message.message)
    } else {
      //sucess
    }

    setModalOpen(false);
  };
  return (
    modalOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.closeButton}
            onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            tabIndex={0}
            role="button"
          >
            <MdOutlineClose />
          </div>
          <form className={styles.form} onSubmit={(e) => hangleSubmit(e)}>
            <h1 className={styles.formTitle}>Add task</h1>
            <label htmlFor="name">
              Name
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label htmlFor="description">
              Description
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescripton(e.target.value)}
              />
            </label>
            <label htmlFor="date">
              date
              <input
                type="datetime-local"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <div className={styles.buttonContainer}>
              <Button type="submit" onClick={() => ""}>
                Add task
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default TodoModal;
