import React, { Component } from 'react'
import { Platform, View, ActivityIndicator, SafeAreaView, FlatList, RefreshControl, Dimensions } from 'react-native'
import axios from 'axios';
import { ListItem } from './ListItem';
import { setInterval } from 'core-js';
import { SearchBar, Header } from 'react-native-elements'

export class App extends Component {

  constructor(props) {
    super(props);
    this.page = 1;
    this.totalPages = 1;
    this.state = {
      loading: false, // user list loading
      isRefreshing: false, //for pull to refresh
      data: [], //user list
      filterData: [],
      error: '',
      search: ''
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
        this.totalPages = res.data.nbPages;
        if (this.state.search.trim().length === 0) {
          this.setState({ loading: false, data: data, isRefreshing: false, filterData: data });
        } else {
          this.setState({ loading: false, data: data, isRefreshing: false }, () => this.filterData());
        }
      })
      .catch(error => {
        this.setState({ loading: false, isRefreshing: false, error: 'Something just went wrong' })
      });
  }

  onSearch(text) {
    console.log("Search")
    this.setState({ search: text, filterData: [] }, () => this.filterData())
  }

  filterData() {
    let filterData = this.state.data;
    if (this.state.search.trim().length > 0) {
      filterData = this.state.data.filter((item) => item.title.toLowerCase().startsWith(this.state.search.toLowerCase()));
    }
    console.log("Filter Data")
    console.log(filterData.length)
    this.setState({ filterData: filterData })
  }

  sortByPriceAsc() {
    this.setState(prevState => {
      this.state.filterData.sort((a, b) => (a.title - b.title))
    });
  }

  sortByPriceDesc() {
    this.setState(prevState => {
      this.state.filterData.sort((a, b) => (b.title - a.title))
    });
  }

  onClear() {
    // console.log("Clear")
    // console.log(this.state.data)
    // this.setState({
    //   filterData: this.state.data
    // })
    // true isRefreshing flag for enable pull to refresh indicator
  }

  render() {
    return (
      <SafeAreaView style={{ width: '100%', height: '100%', flex: 1, backgroundColor: '#eee' }}>
        <Header
          centerComponent={{ text: 'POSTS', style: { color: '#fff', fontWeight: "bold" } }}
          containerStyle={{
            backgroundColor: '#3D6DCC',
            justifyContent: 'space-around',
            paddingTop: 0,
            height: Platform.select({
              android: 56,
              default: 44,
            }),
          }}
        />
        <SearchBar
          lightTheme
          onChangeText={(text) => this.onSearch(text)}
          onClear={this.onClear}
          value={this.state.search}
          placeholder='Search...' />
        {this.state.loading && this.page === 1 &&
          <View style={{
            width: '100%',
            height: '100%'
          }}>
            <ActivityIndicator style={{ color: '#000' }} />
          </View>
        }

        {this.state.filterData.length > 0 &&
          <FlatList
            data={this.state.filterData}
            extraData={this.state}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
            renderItem={({ item, index }) => (
              <ListItem
                key={index}
                item={item} />
            )}
            keyExtractor={(item, index) => index.toString()}
            // ItemSeparatorComponent={this.renderSeparator}
            ListFooterComponent={this.renderFooter.bind(this)}
            
          />
        }
      </SafeAreaView>
    )

  }
}

export default App
