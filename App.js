import React, { useState } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddModalActive, setIsAddModalActive] = useState(false);

  const addGoalHandler = (goal) => {
    setCourseGoals((currentGoals) => [...currentGoals, goal]);
    setIsAddModalActive(false);
  };

  const removeGoalHandler = (index) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal, goalIndex) => goalIndex !== index);
    });
  };

  const cancelGoalAddModal = () => {
    setIsAddModalActive(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddModalActive(true)} />
      <GoalInput
        visible={isAddModalActive}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAddModal}
      />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            title={itemData.item}
            onDelete={() => removeGoalHandler(itemData.index)}
          />
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { padding: 50 },
});
