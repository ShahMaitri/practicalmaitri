// Ascending Descending Blog Filters - Filter via Date

import React from 'react'
import { ButtonGroup } from 'react-native-elements'

const BlogFilters = (props) => {
    const buttons = ['Ascending', 'Descending']
    return (
        <ButtonGroup
        onPress={selectedIndex => {
          props.selectedIndex !== selectedIndex ? props.updateIndex(selectedIndex) : {}
        }}
        selectedButtonStyle={{ backgroundColor: '#EA7600'}}
        selectedIndex={props.selectedIndex}
        buttons={buttons}
      />
    )
}

export default BlogFilters

