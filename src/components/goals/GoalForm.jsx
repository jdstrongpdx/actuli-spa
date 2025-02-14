import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap"; 

export const GoalForm = (props) => {
    const [description, setDescription] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!description.trim()) {
            return;
        }

        props.addGoal(description);
        setDescription('');
    }

    const handleChange = (e) => {
        setDescription(e.target.value);
    }

    return (
        <Form className="goal-form" onSubmit={handleSubmit}>
            <Form.Group>
                <InputGroup className="mb-7">
                    <Form.Control
                        type="text"
                        id="new-goal-input"
                        name="text"
                        autoComplete="off"
                        value={description}
                        onChange={handleChange}
                        placeholder="Enter a goal"
                    />
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </InputGroup>
            </Form.Group>
        </Form>
    );
}
