import React, { Component } from 'react'
import { Text, View, ActivityIndicator, SafeAreaView, FlatList, RefreshControl, Dimensions } from 'react-native'
import axios from 'axios';
import { ListItem } from './ListItem';
import { setInterval } from 'core-js';

export class App extends Component {

  constructor(props) {
    super(props);
    this.page = 1;
    this.totalPages = 1;
    this.state = {
      loading: false, // user list loading
      isRefreshing: false, //for pull to refresh
      data: [], //user list
      error: '', 
      
    }
  }

  componentDidMount() {
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

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.loading) return null;
    return (
      <ActivityIndicator
        style={{ color: '#000' }}
      />
    );
  };

  // handleLoadMore = () => {
  //   if (!this.state.loading) {
  //     this.page = this.page + 1; // increase page by 1
  //     this.fetchData(this.page); // method for API call 
  //   }
  // };

  onRefresh() {
    this.setState({ isRefreshing: true, data: [], error: '' }, () => {
      this.fetchData(1)
    }); // true isRefreshing flag for enable pull to refresh indicator
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#CED0CE'
        }}
      />
    );
  };

  fetchData(page) {
    //Data API url
    const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`;
   
    axios.get(url)
      .then(res => {
        console.log(res)
        let listData = this.state.data;
        let data = listData.concat(res.data.hits) //concate list with response
        this.page = res.data.page + 1;
        this.totalPages = res.data.nbPages
        this.setState({ loading: false, data: data, isRefreshing: false })
      })
      .catch(error => {
        this.setState({ loading: false, isRefreshing: false, error: 'Something just went wrong' })
      });
  }

  render() {
    if (this.state.loading && this.page === 1) {
      return <View style={{
        width: '100%',
        height: '100%'
      }}><ActivityIndicator style={{ color: '#000' }} /></View>;
    }
    return (
      <SafeAreaView style={{ width: '100%', height: '100%', flex: 1 }}>
        <FlatList
          data={this.state.data}
          extraData={this.state}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          renderItem={({ item }) => (
            <ListItem item={item} />
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter.bind(this)}
          
        />
      </SafeAreaView>
    );
  }
}

export default App
