import React from "react";

const UserGameList = ({ userGames }) => (
    <div className="user-game-list">
        <h2>My Game List</h2>
        {userGames.length > 0 ? (
            userGames.map((game) => (
                <div key={game.id} className="game-item">
                    <h3>{game.name}</h3>
                    <p>{game.genre}</p>
                    <p>{game.year}</p>
                </div>
            ))
        ) : (
            <p>No games added yet.</p>
        )}
    </div>
);

export default UserGameList;
