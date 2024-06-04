import React, { useRef, useEffect, useState } from "react";
import Playlists from "./Playlists";
import nextKey from "generate-my-key";

const Home = () => {
  const dataCategories = [
    {
      id: 1,
      name: "Focus",
      tagline: "Music to help you concentrate",
    },
    {
      id: 2,
      name: "Mood",
      tagline: "Playlist to match your mood",
    },
    {
      id: 3,
      name: "SoundTrack your home",
      tagline: "",
    },
    {
      id: 4,
      name: "Aradddd",
      tagline: "Kick bass this sunday",
    },
  ];

  const observer = useRef(null);
  const [myElementIsVisible, setMyElementIsVisible] = useState();
  console.log("myElementIsVisible", myElementIsVisible); // Create a ref to ;hold the observer

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Perform actions when element comes into view
          setMyElementIsVisible(entry.isIntersecting);
        }
      });
    });

    // Clean up function
    // return () => {
    //   if (observer.current) {
    //     observer.current.disconnect();
    //   }
    // };
  }, []); // Run effect only once

  return (
    <div className="mainInner">
      {dataCategories.map((category) => (
        <div key={nextKey()}>
          <div className="cardsWrap" key={nextKey()} ref={observer}>
            <h2>{category.name}</h2>
            <span className="seeAll">SEE ALL</span>
            <p className="subText">{category.tagline}</p>
            <Playlists category_id={category.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
