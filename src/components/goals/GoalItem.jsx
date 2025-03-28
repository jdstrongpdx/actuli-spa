import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

export const GoalItem = (props) => {
    const [isEditing, setEditing] = useState(false);
    const [newDescription, setDescription] = useState('');

    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    const wasEditing = usePrevious(isEditing);

    const handleChange = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newDescription.trim()) {
            return;
        }

        props.editGoal(props.id, newDescription);
        setDescription('');
        setEditing(false);
    }

    const editingTemplate = (
        <div className="goal-edit">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor={props.id}>New name for {props.name}</Form.Label>
                    <Form.Control
                        id={props.id}
                        type="text"
                        value={newDescription}
                        onChange={handleChange}
                        ref={editFieldRef}
                    />
                </Form.Group>
                <div className="btn-group">
                    <ButtonGroup>
                        <Button variant="warning" type="button" onClick={() => setEditing(false)}>
                            Cancel
                        </Button>
                        <Button variant="success" type="submit">
                            Save
                        </Button>
                    </ButtonGroup>
                </div>
            </Form>
        </div>
    );

    const viewTemplate = (
        <div className="goal-view">
            <Form.Group>
                <label className="goal-label" htmlFor={props.id}>
                    {props.description}
                </label>
                <ButtonGroup className="goal-view-btn">
                    <Button variant="warning" onClick={() => setEditing(true)} ref={editButtonRef}>
                        Edit
                    </Button>
                    <Button variant="danger" onClick={() => props.deleteGoal(props.id)}>
                        Delete
                    </Button>
                </ButtonGroup>
            </Form.Group>
        </div>
    );

    useEffect(() => {

        if (!wasEditing && isEditing) {
            editFieldRef.current.focus();
        }

        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }

    }, [wasEditing, isEditing]);

    return <ListGroup.Item className="goal-item">{isEditing ? editingTemplate : viewTemplate}</ListGroup.Item>;
}
