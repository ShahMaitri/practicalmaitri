import React from 'react'
import {
    View,
    Text
} from 'react-native'

export const ListItem = (props) => {
    return (
        <View>
        <View style={{
            padding: 15,
          }}>

            <Text style={{
              fontSize: 18,
              alignItems: 'center',
              color: '#65A7C5',
            }}>{props.item.title.trim()}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>

              <View>
                <Text style={{
                  fontSize: 18,
                  alignItems: 'center',
                  color: '#65A7C5',
                }}>Author: {props.item.author}</Text>
                <Text style={{
                  fontSize: 18,
                  alignItems: 'center',
                  color: '#65A7C5',
                }}>{props.item.created_at}</Text>
              </View>

              <View
                style={{
                alignItems: 'center'
              }}>
              <Text style={{
                  fontSize: 18,
                  alignItems: 'center',
                  color: '#65A7C5',
                }}>Points</Text>
                <Text style={{
                  fontSize: 18,
                  alignItems: 'center',
                  color: '#65A7C5',
                }}>{props.item.points}</Text>
              </View>

            </View>



            </View>
            </View>
    )
}
