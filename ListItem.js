import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { Card } from 'react-native-elements'

export const ListItem = (props) => {
    return (
        <View>
            <Card borderRadius={5} >
                <View style={{
                    padding: 5,
                }}>

                    <Text style={{
                        fontSize: 18,
                        alignItems: 'center',
                        color: '#65A7C5',
                    }}>{props.item.title.trim()}</Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 15
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
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 40,
                                width: 40,
                                borderColor: '#eee',
                                borderWidth: 2,
                                borderRadius: 25
                            }}>
                            <Text style={{
                                fontSize: 18,
                                alignItems: 'center',
                                color: '#65A7C5',
                            }}>{props.item.points}</Text>
                        </View>

                    </View>



                </View>
            </Card>
        </View>
    )
}
