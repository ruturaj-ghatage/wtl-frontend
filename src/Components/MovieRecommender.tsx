import { useState } from "react";
import axios from "axios";

function MovieRecommender() {
  const [movie, setMovie] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(movie);
    try {
      fetch("https://ruturaj-ghatage-reimagined-space-engine-wj95vxr4j6625prx-5000.preview.app.github.dev/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: movie }),
        // mode: "no-cors",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Movie Recommender</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={movie}
          onChange={(event) => {
            const input = event.target.value;
            const modifiedInput = input.split(" ").join("_");
            setMovie(modifiedInput);
          }}
          placeholder="Enter a movie title"
          className="border-2 border-gray-300 rounded-lg px-4 py-2 w-80 mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      <div className="mt-8">
        {recommendations.map((movie: any) => (
          <div key={movie} className="flex items-center justify-start mb-4">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold">{movie}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieRecommender;
