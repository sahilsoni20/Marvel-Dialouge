import axios from "axios";
import md5 from "md5";

const PUBLIC_KEY = "2d31aaf188440cc9f2c6a24d8697afca";
const PRIVATE_KEY = "bc9fc9a4efc30477b6cf81e7de05d51e2e2a499d";
const BASE_URL = "http://gateway.marvel.com/v1/public/";

const getHash = (ts) => {
  return md5(ts + PRIVATE_KEY + PUBLIC_KEY);
};

export const fetchCharacters = async () => {
  try {
    const ts = Date.now().toString();
    const hash = getHash(ts); //ts = timestamp, is an unique identifier use to mark the exact moment when an event/action occurred 
    const response = await axios.get(`${BASE_URL}characters`, {
      params: {
        ts,
        apikey: PUBLIC_KEY,
        hash,
        limit: 10,
      },
    });
    return response.data.data.results; // Ensure this returns an array
  } catch (error) {
    console.error("Error fetching characters:", error);
    return []; // Return an empty array on error
  }
};

export const fetchComics = async (characterId) => {
  try {
    const ts = Date.now().toString();
    const hash = getHash(ts);
    const response = await axios.get(
      `${BASE_URL}characters/${characterId}/comics`,
      {
        params: {
          ts,
          apikey: PUBLIC_KEY,
          hash,
          limit: 10,
        },
      }
    );
    return response.data.data.results;
  } catch (error) {
    console.error("Error fetching characters:", error);
    return []; 
  }
};
