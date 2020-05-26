// Description of Blog

import React from 'react'
import { View, Button, Text, StyleSheet, Dimensions, Linking } from 'react-native'
import Modal from 'react-native-modal';
import Moment from 'react-moment';

export const BlogDescription = (props) => {

  return (
    <View style={styles.centeredView}>

      <Modal isVisible={props.isModalVisible} >
        <View style={styles.modalView}>

          <Text style={{ alignSelf: 'center' }}>Detail</Text>
          <View style={styles.rowStyle}></View>

          <Text style={{ marginTop: 10 }}>{props.item.title}</Text>
          {props.item.url !== null &&
            <Text style={styles.linkStyle}
              onPress={() => Linking.openURL(props.item.url)}>
              {props.item.url}
            </Text>
          }

          <View
            style={styles.authorDateParentStyle}>
            <Text style={{
              fontSize: 14,
              color: '#65A7C5'

            }}>Written by: {props.item.author}</Text>

            <Text
              style={{
                fontSize: 12,
                color: '#65A7C5'
              }}>
              {<Moment element={Text} format="YYYY/MM/DD HH:mm:ss" date={props.item.created_at} />}
            </Text>
          </View>

          <View style={styles.rowStyle}></View>

          <View style={styles.tagParentstyle}>
            {
              props.item._tags.map(tag => <Text style={styles.tagStyle}>{tag}</Text>)
            }
          </View>
          <View style={styles.rowStyle}></View>

          <Button title="Close" onPress={props.toggleModal} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  linkStyle: {
    color: 'blue',
    marginTop: 10
  },
  rowStyle: {
    height: 1,
    backgroundColor: '#ccc',
    width: Dimensions.get('window').width / 1.5,
    marginVertical: 10,
    alignSelf: 'center'
  },
  tagStyle: {
    borderColor: '#eee',
    borderRadius: 5,
    borderWidth: 2,
    paddingHorizontal: 5,
    margin: 5
  },
  tagParentstyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  authorDateParentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  }
});