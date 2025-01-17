import {Component} from 'react'
import './index.css'
import Navbar from '../Navbar'
import TableMenu from '../TableMenu'
import Dishes from '../Dishes'

class Home extends Component {
  state = {
    initialRestroData: [],
    isLoading: true,
    restroTableMenu: [],
    activeCategory: '',
    categoryDishes: [],
  }

  componentDidMount() {
    this.getMenuList()
  }

  getMenuList = async () => {
    const apiUrl = `https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details`
    const options = {
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        const firstCategory = data[0].table_menu_list[0]
        this.setState({
          initialRestroData: data[0],
          restroTableMenu: data[0].table_menu_list,
          activeCategory: firstCategory.menu_category,
          categoryDishes: firstCategory.category_dishes,
          isLoading: false,
        })
      }
    } catch (error) {
      console.error(`Error while fetching data :: ${error}`)
    }
  }

  updateCategoryDishes = wholeCategory => {
    this.setState({
      activeCategory: wholeCategory.menu_category,
      categoryDishes: wholeCategory.category_dishes,
    })
  }

  render() {
    const {
      restroTableMenu,
      isLoading,
      activeCategory,
      categoryDishes,
      initialRestroData,
    } = this.state
    console.log(initialRestroData)
    const restroName = initialRestroData.restaurant_name
    console.log(restroName)

    return (
      <div className="">
        <Navbar restroName={restroName} />
        <ul className="restro-table-menu-category">
          {isLoading ? (
            <p>Loading</p>
          ) : (
            restroTableMenu.map(eachCategory => (
              <TableMenu
                key={eachCategory.menu_category_id}
                eachCategory={eachCategory}
                categoryDishes={this.updateCategoryDishes}
                activeCategory={activeCategory}
              />
            ))
          )}
        </ul>
        <ul className="category-dishes-list">
          {categoryDishes.map(dish => (
            <Dishes key={dish.dish_id} dish={dish} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Home
