import { useState, useEffect, useCallback, useContext } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Error from "../components/Error";
import { useParams } from "react-router";
import { fetchDetails, fetchCredits, fetchVideos } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import useFirestore from "../hooks/useFirestore";
import DetailsLayout from "../components/details/DetailsLayout";

const Details = () => {
  const [details, setDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(null);

  const { user } = useContext(AuthContext);
  const { saveWatchItemToDB, removeItemFromDB, checkIfInWatchlist } =
    useFirestore();

  const { type, id } = useParams();

  const fetchData = useCallback(() => {
    const handleFetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const [details, credits, videos] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
          fetchVideos(type, id),
        ]);
        setDetails(details);
        setCast(() => credits.cast.slice(0, 20));
        setVideos(videos);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    handleFetchData();
  }, [type, id]);

  const handleAddToWatchList = async () => {
    const detailsData = {
      poster_path: details.poster_path,
      [type === "tv" ? "first_air_date" : "release_date"]:
        details.first_air_date || details.release_date,
      [type === "movie" ? "title" : "name"]: details.title || details.name,
      media_type: type,
      id: details.id,
      vote_average: details.vote_average,
    };

    await saveWatchItemToDB(user.uid, id, detailsData);
    const isInWatchlist = await checkIfInWatchlist(user.uid, id);
    setIsInWatchlist(isInWatchlist);
  };

  const handleRemoveFromWatchList = async () => {
    await removeItemFromDB(user.uid, id);
    const isInWatchlist = await checkIfInWatchlist(user.uid, id);
    setIsInWatchlist(isInWatchlist);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    try {
      const checkWatchlist = async () => {
        if (!user) return;
        const result = await checkIfInWatchlist(user.uid, id);
        setIsInWatchlist(result);
      };
      checkWatchlist();
    } catch (err) {
      setError(err);
    }
  }, [checkIfInWatchlist, user, id]);

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && error && (
        <Error message="Something went wrong" onRetry={() => fetchData()} />
      )}
      {!loading && !error && (
        <DetailsLayout
          details={details}
          cast={cast}
          videos={videos}
          handleAddToWatchList={handleAddToWatchList}
          handleRemoveFromWatchList={handleRemoveFromWatchList}
          isInWatchlist={isInWatchlist}
        />
      )}
    </>
  );
};

export default Details;
