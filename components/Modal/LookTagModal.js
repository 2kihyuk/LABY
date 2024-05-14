import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';

const LookTagModal = ({ visible, onSave, onClose }) => {
  const [brand, setBrand] = useState('');
  const [productName, setProductName] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [purchaseLocation, setPurchaseLocation] = useState('');

  const handleSave = () => {
    if (!brand || !productName || !price || !size || !purchaseLocation) {
      Alert.alert('입력 오류', '모든 항목을 입력해주세요.');
      return;
    }
    onSave({ brand, productName, price, size, purchaseLocation });
    setBrand('');
    setProductName('');
    setPrice('');
    setSize('');
    setPurchaseLocation('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>착용 제품 정보를 알려주세요!</Text>
          <Text>브랜드</Text>
          <TextInput
            style={styles.input}
            placeholder="브랜드를 입력하세요."
            onChangeText={text => setBrand(text)}
            value={brand}
          />
          <Text>상품명</Text>
          <TextInput
            style={styles.input}
            placeholder="상품명을 입력하세요"
            onChangeText={text => setProductName(text)}
            value={productName}
          />
          <Text>사이즈</Text>
          <TextInput
            style={styles.input}
            placeholder="사이즈를 입력하세요"
            onChangeText={text => setSize(text)}
            value={size}
          />
          <Text>가격</Text>
          <TextInput
            style={styles.input}
            placeholder="가격을 입력하세요"
            onChangeText={text => setPrice(text)}
            value={price}
          />
          <Text>구매처 링크</Text>
          <TextInput
            style={styles.input}
            placeholder="구매처 링크를 입력하세요"
            onChangeText={text => setPurchaseLocation(text)}
            value={purchaseLocation}
          />
          <View style={styles.buttonContainer}>
            <Button title="저장" onPress={handleSave} />
            <Button title="닫기" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: '#fffffff5',
    paddingHorizontal: 30,
    width: '80%',
    borderRadius: 15,
    paddingVertical: 20,
    marginBottom: 30
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default LookTagModal;
