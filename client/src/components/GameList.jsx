import PropTypes from "prop-types";

export default function GameList({ game, handleOnAdd }) {
    return (
        <>
            <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg shadow-md">
                <img
                    src={game.imageUrl}
                    alt={game.name}
                    className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">
                            {game.name}
                        </h3>
                        <p className="text-sm text-gray-400">{game.released}</p>
                    </div>
                    <p className="text-sm text-gray-400">{game.genres}</p>
                    <p className="text-sm text-gray-300">
                        Rating: {game.rating}
                    </p>
                </div>
                <button
                    onClick={(e) => handleOnAdd(e, game)}
                    className="bg-cyan-400 hover:bg-cyan-300 text-black px-2 py-1 rounded-md font-medium"
                >
                    +
                </button>
            </div>
        </>
    );
}

GameList.PropTypes = {
    game: PropTypes.exact({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        released: PropTypes.string,
        imageUrl: PropTypes.string,
        rating: PropTypes.number,
        genres: PropTypes.string,
    }),
};
