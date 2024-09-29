import styles from "./App.module.css"
import './App.css';
import { useEffect, useState } from "react";
import SearchResult from "./components/SearchResult/SearchResult.jsx";

export const BASE_URL = "https://foodyzone-npmu.onrender.com"

const App = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filteredData, SetFilteredData] = useState(null)
  const [selectedBtn, setSelectedBtn] = useState("all")

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true)
      try {
        const response = await fetch(BASE_URL)

        const json = await response.json()
        setData(json)
        SetFilteredData(json)
        setLoading(false)
      } catch (error) {
        setError("Unable to fetch data")
      }
    }
    fetchFoodData()

  }, [])

  const searchFood = (e) => {
    const searchValue = e.target.value
    if (searchValue === "") {
      SetFilteredData(null)
    }
    const filter = data?.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()))
    SetFilteredData(filter)
  }

  const filterFood = (type) => {
    if (type === "all") {
      SetFilteredData(data)
      setSelectedBtn("all")
      return
    }
    const filter = data?.filter((food) => food.type.toLowerCase().includes(type.toLowerCase()))
    SetFilteredData(filter)
    setSelectedBtn(type)
  }

  const filterBtns = [
    {
      name: "All",
      type: "all"
    },
    {
      name: "Breakfast",
      type: "breakfast"
    },
    {
      name: "Lunch",
      type: "lunch"
    },
    {
      name: "Dinner",
      type: "dinner"
    },
  ]

  if (error) return <div>{error}</div>
  if (loading) return <div>Loading.....</div>

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topsection}>
          <div className={styles.logo}>
            <img src="/Foody Zone.png" alt="Logo" />
          </div>
          <div className={styles.search}>
            <input onChange={searchFood} placeholder="Search Food" />
          </div>
        </div>
        <div className={styles.filterContainer}>
          {filterBtns.map((value) => (
            <button key={value.name} onClick={() => filterFood(value.type)}>{value.name}</button>
          ))}
        </div>
      </div>
      <SearchResult data={filteredData} />
    </>
  )
};

export default App;
