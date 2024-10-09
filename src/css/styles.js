import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
  },
  searchFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  autocompleteContainer: {
    flex: 1,
    marginRight: 10,
  },
  card: {
    marginBottom: 12,
  },
  menuItem: {
    color: 'black',
  },
  menu: {
    marginTop: 50,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  wishlistContainer: {
    alignItems: 'center'
  },
  inquiryText: {
    marginTop: 10,
    marginBottom: 10
  },

  addBtn: {
    backgroundColor: '#8E44AD',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  submitBtn: {
    marginTop: 50,
    backgroundColor: '#800080',
    marginHorizontal: 24
  },
  cartContainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginTop: 10
  },
  removeBtn:{
    backgroundColor:'white',
    borderWidth:1,
    borderColor:'purple',
  },
  marginH12: {
    marginHorizontal: 12
  },
  marginTop5: {
    marginTop: 5
  },
  marginTop10: {
    marginTop: 10
  },
  marginTop20: {
    marginTop: 20
  },
  marginBottom10:{
marginBottom:10
  },
  padding10:{
    padding:10
  },
  labelWhiteColor:{
    color:'white'
  },
  labelPurple:{
       color:'purple'
  }
});

export default styles;
