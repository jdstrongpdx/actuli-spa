import React, { useState, useRef, useEffect } from 'react';
import ListGroup from "react-bootstrap/ListGroup";

import { GoalForm } from "./GoalForm";
import { GoalItem } from "./GoalItem";

import useFetchWithMsal from '../../hooks/useFetchWithMsal';
import { protectedResources } from "../../authConfig";

function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

export const GoalListView = (props) => {

    const { error, execute } = useFetchWithMsal({
        scopes: protectedResources.user.scopes.write
    });

    const [goals, setGoals] = useState(props.goalListData);

    const handleAddGoal = (description) => {
        const newGoal = {
            description: description,
        };

        execute('POST', protectedResources.user.endpoint, newGoal).then((response) => {
            if (response) {
                setGoals([...goals, response]);
            }
        });
    };

    const handleDeleteGoal = (id) => {
        execute("DELETE", protectedResources.user.endpoint + `/${id}`).then((response) => {
            if (response.status === 200 || response.status === 204) {
                const remainingGoals = goals.filter(goal => id !== goal.id);
                setGoals(remainingGoals);
            }
        });
    }

    const handleEditGoal = (id, description) => {
        const updatedGoal = goals.find((goal) => id === goal.id);
        updatedGoal.description = description;

        execute('PUT', protectedResources.user.endpoint + `/${id}`, updatedGoal).then((response) => {
            const updatedGoals = goals.map((goal) => {
                if (id === goal.id) {
                    return { ...goal, description: description };
                }
                return goal;
            });
            setGoals(updatedGoals);
        });
    };

    const goalList = goals.map((goal) => {
        return <GoalItem
            id={goal.id}
            description={goal.description}
            key={goal.id}
            deleteGoal={handleDeleteGoal}
            editGoal={handleEditGoal}
        />
    });

    const listHeadingRef = useRef(null);
    const prevGoalLength = usePrevious(goals.length);

    useEffect(() => {
        if (goals.length - prevGoalLength === -1) {
            listHeadingRef.current.focus();
        }
    }, [goals.length, prevGoalLength]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="data-area-div">
            <GoalForm addGoal={handleAddGoal} />
            <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>{""}</h2>
            <ListGroup className="goal-list">
                {goalList}
            </ListGroup>
        </div>
    );
}
