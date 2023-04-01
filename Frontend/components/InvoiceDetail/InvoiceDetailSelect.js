import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors/Colors';

const OPTIONS = [ 'N/A', '90 days', '1 year', '2 years'];

function InvoiceDetailSelect({ value, onSelect }) {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const handleOptionSelect = (option) => {
    setExpanded(false);
    onSelect(option);
  };

  const renderOption = (option) => (
    <Pressable
      key={option}
      onPress={() => handleOptionSelect(option)}
      style={styles.option}
    >
      <Text style={styles.selectText}>{option}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <View style={styles.select}>
          <Text style={styles.selectText}>{value}</Text>
          <Octicons name="chevron-down" style={{marginHorizontal: 5}} size={22} color="black" />
        </View>
      </Pressable>
      {expanded && (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsWrapper}>
            {OPTIONS.filter(option => option != value).map(renderOption)}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 75,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.black,
    position: 'relative',
    zIndex: 9999,
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 2,
  },
  selectText: {
    fontSize: 12,
  },
  optionsContainer: {
    position: 'absolute',
    top: '110%',
    left: 0,
    right: 0,
    borderRadius: 10,
    backgroundColor: Colors.white,
    zIndex: 99999,
  },
  optionsWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.darkGrey,
  },
  option: {
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkGrey,
  },
});

export default InvoiceDetailSelect;
