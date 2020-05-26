import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Linking
} from 'react-native'
import { Card } from 'react-native-elements'
import Moment from 'react-moment';

export const BlogListItem = (props) => {
    return (
        <View >
            <Card borderRadius={5} >
                <TouchableOpacity onPress={() => props.showDesc()}>
                    <View style={{
                        padding: 5,
                    }}>

                        <Text style={{
                            fontSize: 18,
                            alignItems: 'center',
                            color: '#000',
                        }}>{props.item.title.trim()}</Text>


                        <Text style={{ color: 'blue', marginTop: 10 }}
                            onPress={() => Linking.openURL(props.item.url)}>
                            {props.item.url}
                        </Text>

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 15
                            }}>
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
                    </View>

                </TouchableOpacity>
            </Card>
        </View>
    )
}
