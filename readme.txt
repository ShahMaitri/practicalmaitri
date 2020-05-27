Practical: Time: ​03:00 Hours

1. Call API ​https://hn.algolia.com/api/v1/search_by_date?tags=story&page=1 
2. List out data with Title, date, url, author etc.
3. Apply pagination on every 3 seconds.
4. Pull to refresh.
5. Click on list show item object in dialog.
6. Add search option and filter list by title, author with single search option.
7. Add filter options: Filter by Date ASC, Date DESC

---------------------------------------------------------------------------------

Feature List:

1. Call API https://hn.algolia.com/api/v1/search_by_date?tags=story&page=1
- Axios library has been used for API calls.
- Page parameter in the API would be dynamic and tags parameter value will be static.
- The code for calling API will be available at the root/source/APIs/ApiCalls.js file.
- The list of APIs will be available at the root/source/APIs/Urls.js file.

2. List out data with Title, date, url, author, etc.
- Each list item will be loaded from (root/source/modules/Blogs/BlogListItem.js file.
- The header has been used from the react-native-elements library (root/source/modules/Blogs/BlogList/BlogListHeader.js)
- You will find the react-native-vector-icons library in package.json as it's required with a react-native-elements library.
- The button group has been used from the react-native-elements library for the filter purpose (root/source/modules/Blogs/BlogList/BlogFilters.js)
- The search bar has been added from the react-native-elements library for search purpose (root/source/modules/Blogs/BlogList.js)

3. Apply pagination on every 3 seconds.
- As per the request, the API call will happen at an interval of 3 seconds. (root/source/modules/Blogs/BlogList.js)
- API will keep calling unless that will reach the highest number of pages available.
- This approach is not suggested as this may lack app performance and UX behavior of the app.
- In the case of multiple modules available in the app, interval API calls need to be stopped in component's componentWillUnmount() method for better performance.

4. Pull to refresh.
- Implemented pull to refresh with the flat list. (root/source/modules/Blogs/BlogList.js)
- Pull to refresh will remove all loaded data and recall APIs at an interval of 3 seconds as before.

5. Click on the list show item object in the dialog.
- When user will click on any of the blog items in the list dialog will appear with all blog related details. (root/source/modules/Blogs/BlogDescription.js)
- Modal has been used from the react-native-modal library.- For the date format the react-moment library has been used in the code.- The modal or we can say dialog will be closed when clicking on the close button in the dialog.

6. Add search option and filter list by title, author with single search option.
- The search will have two scenarios, search via title or search via the author.
- The search can be merged with the filters of ascending or descending via date

7. Add filter options: Filter by Date ASC, Date DESC
- The filter will have two options Ascending by date or descending by date.
