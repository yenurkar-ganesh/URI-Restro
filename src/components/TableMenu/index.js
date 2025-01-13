import './index.css'

const TableMenu = ({eachCategory, categoryDishes, activeCategory}) => {
  const {menu_category} = eachCategory

  const activeClassName = menu_category === activeCategory && 'active'

  const categoryClickHandler = () => {
    categoryDishes(eachCategory)
  }

  return (
    <li className={`restro-category ${activeClassName}`}>
      <button
        className={`categoryBtn ${activeClassName}`}
        onClick={categoryClickHandler}
      >
        <p>{menu_category}</p>
      </button>
    </li>
  )
}

export default TableMenu
