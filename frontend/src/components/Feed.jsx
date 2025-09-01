import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const location = useLocation();
  const ideaName = categoryId || "new";

  const fetchData = () => {
    setLoading(true);

    if (location.pathname === "/") {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else if (location.pathname.startsWith("/category/")) {
      const categoryId = location.pathname.replace("/category/", "");
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    fetchData();
    
  }, [location]);

  if (loading) {
    return <Spinner message={`on ajoute ${ideaName} pour ton feed!`} />;
  }

  if (!pins?.length) {
    return <h2 className="text-xl flex justify-center">Pas de postes</h2>;
  }

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
