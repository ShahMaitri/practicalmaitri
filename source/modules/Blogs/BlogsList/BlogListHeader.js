// Header of blog list

import React from 'react';
import { Header } from 'react-native-elements';
import { Platform, StyleSheet } from 'react-native';

const BlogListHeader = () => {
  return (
    <Header
      centerComponent={{ text: 'POSTS', style: { color: '#fff', fontWeight: "bold" } }}
      containerStyle={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EA7600',
    justifyContent: 'space-around',
    paddingTop: 0,
    height: Platform.select({
      android: 56,
      default: 44,
    }),
  }
})

export default BlogListHeader
