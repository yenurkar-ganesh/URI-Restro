import {Component} from 'react'
import './index.css'
import Navbar from '../Navbar'
import TableMenu from '../TableMenu'
import Dishes from '../Dishes'
import Loader from 'react-loader-spinner'

class Home extends Component {
  state = {
    restaurantData: {},
    isLoading: true,
    menuCategories: [],
    activeCategory: '',
    categoryDishes: [],
  }

  componentDidMount() {
    this.getMenuList()
  }

  getMenuList = async () => {
    try {
      const response = await fetch(
        `https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details`,
      )
      if (response.ok) {
        const data = await response.json()
        const firstCategory = data[0]?.table_menu_list[0] || {}

        this.setState({
          restaurantData: data[0] || {},
          menuCategories: data[0]?.table_menu_list || [],
          activeCategory: firstCategory.menu_category || '',
          categoryDishes: firstCategory.category_dishes || [],
          isLoading: false,
        })
      } else {
        throw new Error('Failed to fetch data')
      }
    } catch (error) {
      console.error(`Error fetching data: ${error}`)
      this.setState({isLoading: false})
    }
  }

  updateCategoryDishes = category => {
    this.setState({
      activeCategory: category.menu_category,
      categoryDishes: category.category_dishes,
    })
  }

  render() {
    const {
      menuCategories,
      isLoading,
      activeCategory,
      categoryDishes,
      restaurantData,
    } = this.state

    return (
      <div>
        <Navbar restroName={restaurantData.restaurant_name} />
        <h1 role='heading'>Nxt Cafe</h1>
        <ul className='restro-table-menu-category'>
          {isLoading ? (
            <div className='loader-container' data-testid='loader'>
              <Loader type='ThreeDots' color='#FF033E' height={50} width={50} />
            </div>
          ) : (
            menuCategories.map(category => (
              <TableMenu
                key={category.menu_category_id}
                eachCategory={category}
                categoryDishes={this.updateCategoryDishes}
                activeCategory={activeCategory}
              />
            ))
          )}
        </ul>
        <ul className='category-dishes-list'>
          {isLoading ? (
            <div className='loader-container' data-testid='loader'>
              <Loader type='ThreeDots' color='#FF033E' height={50} width={50} />
            </div>
          ) : (
            categoryDishes.map(dish => (
              <Dishes key={dish.dish_id} dish={dish} />
            ))
          )}
        </ul>
      </div>
    )
  }
}

export default Home
