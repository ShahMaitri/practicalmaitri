import React from 'react'
import { ButtonGroup } from 'react-native-elements'

const BlogFilters = (props) => {
    const buttons = ['Ascending', 'Descending']
    return (
        <ButtonGroup
        onPress={selectedIndex => {
          props.selectedIndex !== selectedIndex ? props.updateIndex(selectedIndex) : {}
        }}
        selectedIndex={props.selectedIndex}
        buttons={buttons}
      />
    )
}

export default BlogFilters

