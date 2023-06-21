import React, {useState} from "react";
import Chevron from "../assets/Chevron";
import GameList from "../assets/GameList";
import Heart from "../assets/Heart";
import axios from "axios";
import serverUrl from "../tools/serverUrl";

const updateDatabase = (data) => {
    axios.post(serverUrl+"/edit", data)
    .then(res=>{
        if (res.data==="succes"){
            localStorage.setItem("games", data.games)
        }
    })
    .catch(err=>{
        console.log(err)
    })
}

const GamesWrapper = ({selectedIndex, callback}) => {
    const followed_games = localStorage.getItem("games").split(",");

    const [items, setItems] = useState(GameList.map(game => (
        {...game, followed: followed_games.includes(game.name)}
    )));
    const [favouriteGames, setFavouriteGames] = useState(items.filter(game => followed_games.includes(game.name)))



    const handleFollow = (name) => {
        const all_names = items.map(game=>game.name);
        var index = all_names.indexOf(name);

        const updatedItems = [...items]; 
        updatedItems[index] = { ...updatedItems[index], followed: !items[index].followed}; 
        const favourite_games = updatedItems.filter(game=>game.followed)

        setItems(updatedItems)
        setFavouriteGames(favourite_games)
        updateDatabase({
            id: localStorage.getItem('id'),
            games: favourite_games.map(game=>game.name)
        })
    }




    return (
        <div className="games-wrapper">
            <div className={`all-games ${selectedIndex === 0 ? "active" : ""}`}>
                <ul className="games-grid">
                    {GameList.map((item, index) => (
                    <li key={`g${index}`} className="hero-game" style={{backgroundImage: `url(${item.url})`}} aria-label={item.name} onClick={()=>{handleFollow(item.name)}}>
                        <Heart className={`heart-icon ${items[index].followed? "clicked":""}`}/>
                    </li>
                ))}
                </ul>
                <Chevron className="white" callback={callback} />
            </div>

            <div className={`favourite-games ${selectedIndex === 1 ? "active" : ""}`}>
                <ul className="games-grid">
                    {favouriteGames.map((item,index) => (
                        <li key={`g${index}`} className="hero-game" style={{backgroundImage: `url(${item.url})`}} alt="a" aria-label={item.name} onClick={()=>{handleFollow(item.name)}}>
                            <Heart className={`heart-icon ${favouriteGames[index].followed? "clicked":""}`}/>
                        </li>
                    ))}
                </ul>
                <Chevron className="white" callback={callback} />
            </div>
        </div>
    )
}

export default GamesWrapper;