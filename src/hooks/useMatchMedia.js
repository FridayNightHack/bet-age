import React, { useEffect, useState } from 'react';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    // on mounting (web-page ready)
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // adding event listener
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    // on unmounting (close web-page)
    return () => media.removeEventListener('change', listener);
  }, [query, matches]);

  return {
    matches,
    isClicked,
  };
};

export default useMediaQuery;
