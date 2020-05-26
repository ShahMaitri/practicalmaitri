import React, { Component } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  RefreshControl,
  StyleSheet
} from 'react-native'

import { fetchData } from '../../../APIs/ApiCalls'

import { BlogListItem } from '../BlogListItem';
import { BlogDescription } from '../BlogDescription';

import { SearchBar } from 'react-native-elements'
import BlogListHeader from './BlogListHeader'
import BlogFilters from './BlogFilters'

export class BlogsList extends Component {

  constructor(props) {
    super(props);

    this.page = 1; // current page in blog api
    this.totalPages = 1; // total pages in blog api

    this.state = {
      loading: false, // user list loading
      isRefreshing: false, //for pull to refresh
      data: [], //origional blog list
      filterData: [], //filtered blog list
      search: '', // search field text
      selectedIndex: -1, // selected filter option
      isModalVisible: false, // description dislog visibility manage
      clickedData: {} // description to be shown in dialog
    }
  }

  componentDidMount() {
    // Api need to be called at interval of 3 seconds
    setInterval(() => {
      if (!this.state.loading && !this.state.isRefreshing && this.totalPages >= this.page) {
        this.setState({ loading: true }, () => {
          console.log(this.page);
          console.log(this.totalPages);
          this.fetchData(this.page)
        })

      }
    }, 3000);
  }

  renderLoader = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.loading) return null;
    return (
      <ActivityIndicator
        style={{ color: '#000' }}
      />
    );
  };

  onRefresh() {
    this.setState({ isRefreshing: true, data: [], selectedIndex: -1, filterData: [] }, () => {
      this.fetchData(1)
    }); // true isRefreshing flag for enable pull to refresh indicator
  }

  fetchData(page) {
    fetchData(page,
      (res) => {

        let listData = this.state.data;
        let data = listData.concat(res.data.hits) //concate list with response

        this.page = res.data.page + 1;
        this.totalPages = res.data.nbPages;

        if (this.state.search.trim().length === 0) {
          this.setState({ loading: false, data: data, isRefreshing: false, filterData: data });
        } else {
          this.setState({ loading: false, data: data, isRefreshing: false }, () => this.filterData());
        }

      }, () => {
        this.setState({ loading: false, isRefreshing: false })
      })
  }

  onSearch(text) {
    console.log("Search")
    this.setState({ search: text, filterData: [] }, () => this.filterData())
  }

  filterData() {
    let filterData = this.state.data;
    if (this.state.search.trim().length > 0) {
      filterData = this.state.data.filter((item) => item.title.toLowerCase().startsWith(this.state.search.toLowerCase()) || item.author.toLowerCase().startsWith(this.state.search.toLowerCase()));
    }
    console.log("Filter Data")
    console.log(filterData.length)
    this.setState({ filterData: filterData }, () => this.sortByTitle())
  }

  updateIndex(selectedIndex) {
    console.log("index ::" + selectedIndex)
    this.setState({ selectedIndex }, () => this.sortByTitle());
  }

  sortByTitle() {
    if (this.state.selectedIndex === 0 || this.state.selectedIndex === 1) {
      this.state.filterData.sort((a, b) => this.state.selectedIndex === 0
        ? (new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        : (new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));

      this.setState({
        filterData: this.state.filterData
      });
    }
  }

  toggleModal = () => {
    this.setState({
      isModalVisible: false
    })
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <BlogListHeader />

        <BlogFilters
          selectedIndex={this.state.selectedIndex}
          updateIndex={(selectedIndex) => this.updateIndex(selectedIndex)}
        />

        <SearchBar
          lightTheme
          onChangeText={(text) => this.onSearch(text)}
          value={this.state.search}
          placeholder='Search by Title or Author' />

        {this.state.loading && this.page === 1 &&
          this.renderLoader()
        }

        {this.state.filterData.length > 0 &&
          <FlatList
            data={this.state.filterData}
            extraData={this.state}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={() => this.onRefresh()}
              />
            }
            renderItem={({ item, index }) => (
              <BlogListItem
                showDesc={() => this.setState({ isModalVisible: true, clickedData: item })}
                key={index}
                item={item} />
            )}
            keyExtractor={(index) => index.toString()}
            ListFooterComponent={this.renderLoader()}
          />
        }
        {this.state.filterData.length > 0 && this.state.isModalVisible &&
          <BlogDescription item={this.state.clickedData} isModalVisible={this.state.isModalVisible} toggleModal={this.toggleModal} />
        }
      </SafeAreaView>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#eee' 
  }
})

export default BlogsList