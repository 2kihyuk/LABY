import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const RoomFilter = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("추천");

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === "추천" && styles.selectedCategory]}
          onPress={() => handleCategoryPress("추천")}
        >
          <Text style={styles.categoryText}>추천</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, selectedCategory === "내 채팅방" && styles.selectedCategory]}
          onPress={() => handleCategoryPress("내 채팅방")}
        >
          <Text style={styles.categoryText}>내 채팅방</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  categoryButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  categoryText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#a1a0a0",
  },
  selectedCategory: {
    color: "#3b66dc",
    borderBottomWidth: 2,
    borderColor: '#cccbcb'
  },
});

export default RoomFilter;