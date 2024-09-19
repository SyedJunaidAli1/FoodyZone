import { BASE_URL } from "../../App"
import styles from "./SearchResult.module.css"

const SearchResult = ({ data }) => {
    return (
        <>
            <div className={styles.foodcontainer}>
                <div className={styles.container}>
                    <div className={styles.foodcards}>
                        {data?.map(({ name, image, text, price }) => (
                            <div key={name} className={styles.foodcard}>
                                <div className={styles.food_image}>
                                    <img src={BASE_URL + image} alt="" />
                                </div>
                                <div className={styles.foodinfo}>
                                    <div className={styles.info}>
                                        <h3>{name}</h3>
                                        <p>{text}</p>
                                    </div>
                                    <button className={styles.foodbtn}>${price.toFixed(2)}</button>
                                </div>
                            </div>))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchResult
