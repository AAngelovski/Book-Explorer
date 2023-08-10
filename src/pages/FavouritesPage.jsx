// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const FavouritesPage = ({ accessToken }) => {
//   const [favorites, setFavourites] = useState([]);

//   useEffect(() => {
//     const fetchFavourites = async () => {
//       if (!accessToken) {
//         console.log("Logiraj se prvo");
//         return;
//       }

//       try {
//         const response = await axios.get(
//           "https://www.googleapis.com/books/v1/mylibrary/bookshelves",
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );

//         const favouritesBookshelf = response.data.items.find(
//           (bookshelf) => bookshelf.title === "Favorites"
//         );

//         if (favouritesBookshelf) {
//           const favouritesResponse = await axios.get(
//             `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${favouritesBookshelf.id}/volumes`,
//             {
//               headers: {
//                 Authorization: `Bearer ${accessToken}`,
//               },
//             }
//           );
//           setFavourites(favouritesResponse.data.items);
//         }
//       } catch (error) {
//         console.log("Terror fetching: ", error);
//       }
//     };
//     fetchFavourites();
//   }, [accessToken]);
//   return (
//     <div>
//       <h1>Favorites</h1>
//       <ul>
//         {favorites.map((favorite) => (
//           <li key={favorite.id}>{favorite.volumeInfo.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FavouritesPage;
