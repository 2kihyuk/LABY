import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Slider from '@react-native-community/slider';
import Colors from "../../constants/color";
import { genders, seasons, moods } from "../../components/List/OptionList";

const StepSlider = ({ value, onValueChange, minimumValue, maximumValue }) => (
  <Slider
    style={{ flex: 1 }}
    minimumValue={minimumValue}
    maximumValue={maximumValue}
    step={1}
    value={value}
    onValueChange={onValueChange}
  />
);

const FilterModal = ({ onCloseModal, onFilterChange, selectedOptions }) => {
  const [minValue, setMinValue] = useState(selectedOptions.height.min);
  const [maxValue, setMaxValue] = useState(selectedOptions.height.max);
  const [selectedGender, setSelectedGender] = useState(selectedOptions.gender);
  const [selectedSeason, setSelectedSeason] = useState(selectedOptions.season);
  const [selectedMood, setSelectedMood] = useState(selectedOptions.mood);

  useEffect(() => {
    setMinValue(selectedOptions.height.min);
    setMaxValue(selectedOptions.height.max);
    setSelectedGender(selectedOptions.gender);
    setSelectedSeason(selectedOptions.season);
    setSelectedMood(selectedOptions.mood);
  }, [selectedOptions]);

  const handleMinValueChange = (value) => {
    setMinValue(value);
  };

  const handleMaxValueChange = (value) => {
    setMaxValue(value);
  };

  const handleGenderSelect = (gender) => {
    if (selectedGender.includes(gender)) {
      setSelectedGender(selectedGender.filter(item => item !== gender));
    } else {
      setSelectedGender([...selectedGender, gender]);
    }
  };

  const handleSeasonSelect = (season) => {
    if (selectedSeason.includes(season)) {
      setSelectedSeason(selectedSeason.filter(item => item !== season));
    } else {
      setSelectedSeason([...selectedSeason, season]);
    }
  };

  const handleMoodSelect = (mood) => {
    if (selectedMood.includes(mood)) {
      setSelectedMood(selectedMood.filter(item => item !== mood));
    } else {
      setSelectedMood([...selectedMood, mood]);
    }
  };

  const handleCloseModal = () => {
    onFilterChange({ gender: selectedGender, season: selectedSeason, mood: selectedMood, height: { min: minValue, max: maxValue } });
    onCloseModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.categoryTitle, styles.title]}>필터</Text>
      <View style={styles.line} />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.categoryTitle}>Gender</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity onPress={() => handleGenderSelect("MEN")} style={[styles.genderButton, selectedGender.includes("MEN") && styles.selectedButton]}>
            <Text style={styles.genderText}>MEN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleGenderSelect("WOMEN")} style={[styles.genderButton, selectedGender.includes("WOMEN") && styles.selectedButton]}>
            <Text style={styles.genderText}>WOMEN</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.categoryTitle}>HEIGHT</Text>
        <View style={styles.sliderContainer}>
          <StepSlider
            value={minValue}
            onValueChange={handleMinValueChange}
            minimumValue={140}
            maximumValue={maxValue}
          />
          <Text style={styles.heightText}>{minValue}cm ~ {maxValue}cm</Text>
          <StepSlider
            value={maxValue}
            onValueChange={handleMaxValueChange}
            minimumValue={minValue}
            maximumValue={195}
          />
        </View>
        <Text style={styles.categoryTitle}>SEASON</Text>
        <View style={styles.genderContainer}>
          {seasons.map((season, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSeasonSelect(season)}
              style={[styles.genderButton, selectedSeason.includes(season) && styles.selectedButton]}
            >
              <Text style={styles.genderText}>{season}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.categoryTitle}>MOOD</Text>
        <View style={styles.genderContainer}>
          {moods.map((mood, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleMoodSelect(mood)}
              style={[styles.genderButton, selectedMood.includes(mood) && styles.selectedButton]}
            >
              <Text style={styles.genderText}>{mood}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={handleCloseModal} style={styles.button}>
          <Text style={styles.buttonText}>스타일 보기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>닫기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingBottom: 50
  },
  scrollView: {
    flex: 1,
    paddingVertical: 23,
    padding: 30,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 18,
    textAlign: "center"
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "#ededed",
    borderRadius: 5,
    paddingVertical: 11,
    marginTop: 10,
    marginBottom: 50
  },
  closeButtonText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5
  },
  line: {
    backgroundColor: "#c8c8c8",
    height: 1,
    marginBottom: 21,
  },
  categoryTitle: {
    color: "#000000",
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  genderContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 26,
  },
  genderButton: {
    backgroundColor: '#fbfbfb',
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 6,
    alignItems: 'center',
    textAlign:'center'
  },
  selectedButton: {
    backgroundColor: "#c3effb",
    borderColor: "#c3effb"
  },
  genderText: {
    color: Colors.primary100,
    fontSize: 14,
    fontWeight: "bold",
  },
  heightText: {
    color: "#000000",
    fontSize: 15,
    marginBottom: 14,
  },
  sliderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: 5,
    paddingVertical: 11,
    marginTop: 35
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5
  }
});

export default FilterModal;