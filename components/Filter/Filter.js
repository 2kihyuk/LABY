// Filter.js

import React, { useState } from "react";
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from "react-native";
import Colors from "../../constants/color";
import FilterModal from "../Modal/FilterModal";
import { genders, seasons, moods } from "../../components/List/OptionList";

const Filter = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    gender: [],
    season: [],
    mood: [],
    height: { min: 140, max: 195 }
  });

  const handleFilterChange = (options) => {
    setSelectedOptions(options);
  };

  const handleOptionPress = (category, option) => {
    const newSelectedOptions = { ...selectedOptions };
    const categoryOptions = newSelectedOptions[category];

    if (categoryOptions.includes(option)) {
      newSelectedOptions[category] = categoryOptions.filter(item => item !== option);
    } else {
      newSelectedOptions[category] = [...categoryOptions, option];
    }

    setSelectedOptions(newSelectedOptions);
  };

  const handleFilterIconPress = () => {
    setModalVisible(true);
  };

  const renderOptions = (category, allOptions) => {
    return allOptions.map((option, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleOptionPress(category, option)}
        style={[
          styles.category,
          selectedOptions[category].includes(option) ? styles.selectedCategory : null
        ]}
      >
        <Text style={styles.categoryText}>{option}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleFilterIconPress} style={styles.filterIconContainer}>
        <Image
          source={require("../../assets/filter.png")}
          resizeMode="contain"
          style={styles.filterIcon}
        />
      </TouchableOpacity>
      <View style={{ paddingLeft: 50 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rowContainer}>
          {renderOptions("gender", genders)}
          <View style={styles.category}>
            <Text style={styles.categoryText}>{selectedOptions.height.min}cm ~ {selectedOptions.height.max}cm</Text>
          </View>
          {renderOptions("season", seasons)}
          {renderOptions("mood", moods)}
        </ScrollView>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <FilterModal onCloseModal={() => setModalVisible(false)} onFilterChange={handleFilterChange} selectedOptions={selectedOptions} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  filterIconContainer: {
    position: "absolute",
    left: 15,
    zIndex: 1,
    borderColor: Colors.primary900,
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 3
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 17,
  },
  category: {
    paddingHorizontal: 12,
    alignItems: "center",
    borderColor: Colors.primary900,
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 7,
    marginRight: 4,
  },
  selectedCategory: {
    backgroundColor: '#c3effb',
    borderColor:'#c3effb'
  },
  categoryText: {
    color: Colors.primary100,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Filter;