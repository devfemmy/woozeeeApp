import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { Layout, Button, Text, CheckBox } from '@ui-kitten/components';

function index({ bank, index, onSelect }) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback key={index}>
        <View style={styles.container}>
          <View
            style={{
              elevation: 5,
              borderRadius: 5,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'white',
              borderColor: bank.checked ? '#043F7C' : '#dcdcdc',
              borderWidth: 1,
              // shadowColor: '#dcdcdc',
              // shadowOffset: { width: 0, height: 1 },
              // shadowOpacity: 1,
              // shadowRadius: 1,
            }}
          >
            <View style={styles.innerContainer}>
              <Image
                source={bank.logo}
                style={styles.img}
                resizeMode="contain"
                defaultSource={bank.logo}
              />
              <Text style={{ color: 'black' }}>{bank.name}</Text>
            </View>
            <CheckBox
              status="basic"
              checked={bank.selected}
              onChange={onSelect}
              style={styles.checkbox}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 15,
    marginVertical: 5,
  },
  checkbox: {
    alignSelf: 'center',
    marginRight: 15,
    // borderColor: '#dcdcdc',
  },
  img: {
    margin: 15,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default index;
