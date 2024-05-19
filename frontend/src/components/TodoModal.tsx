import React, { useState } from "react";
import styles from "../styles/modules/modal.module.css";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Buttons/Button";

function TodoModal({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [name, setName] = useState("");
    const [descripton, setDescripton] = useState("");
    const [deadline, setDeadline] = useState("2024-05-19T12:30");

    const hangleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({name, descripton, deadline});
        setModalOpen(false);
    }
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
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label htmlFor="descripton">
              Description
              <input type="text" id="descripton" value={descripton} onChange={(e) => setDescripton(e.target.value)}/>
            </label>
            <label htmlFor="deadline">
              Deadline
              <input
                type="datetime-local"
                id="deadline"
                value={deadline} onChange={(e) => setDeadline(e.target.value)}
              />
            </label>
            <div className={styles.buttonContainer}>
              <Button type="submit" onClick={() =>("")}>
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
