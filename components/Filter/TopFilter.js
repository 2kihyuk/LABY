//TopFilter.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TopFilter = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("추천");

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <TouchableOpacity onPress={() => handleCategoryPress("추천")}>
          <Text style={[styles.categoryText, selectedCategory === "추천" && styles.selectedCategory]}>
            추천
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategoryPress("스타일랭킹")}>
          <Text style={[styles.categoryText, selectedCategory === "스타일랭킹" && styles.selectedCategory]}>
            스타일 랭킹
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategoryPress("팔로잉")}>
          <Text style={[styles.categoryText, selectedCategory === "팔로잉" && styles.selectedCategory]}>
            팔로잉
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 8,
    marginHorizontal: 26,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 40
  },
  title: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 12,
    marginHorizontal: 22,
  },
  categoryText: {
    color: "#c1c0c0",
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 35,
  },
  selectedCategory: {
    color: "#000000",
  }
});

export default TopFilter;