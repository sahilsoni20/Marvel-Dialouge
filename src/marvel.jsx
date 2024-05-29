import React, { useEffect, useState } from 'react';
import { fetchCharacters, fetchComics } from './api';
import { PropagateLoader } from 'react-spinners'; // Import CircleLoader from react-spinners

const DialogueGenerator = () => {
  const [dialogue, setDialogue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDialogues = async () => {
      setLoading(true);
      const characters = await fetchCharacters();
      const dialogues = [];

      for (let character of characters) {
        const comics = await fetchComics(character.id);
        for (let comic of comics) {
          if (comic.description) {
            dialogues.push({
              character: character.name,
              quote: comic.description.split('. ')[0] + '.' // Take the first sentence as a "quote"
            });
          }
        }
      }
      
      if (dialogues.length > 0) {
        const randomDialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
        setDialogue(`"${randomDialogue.quote}" ${randomDialogue.character}`);
      } else {
        setDialogue('No dialogues found.');
      }
      
      setLoading(false);
    };

    getDialogues();
  }, []);

  return (
    <div>
      {loading ?
       <PropagateLoader // Use CircleLoader from react-spinners
        color={'white'}
        loading={loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="CircleLoader"
      /> : <p>{dialogue}</p>}
      <button style={{ position: 'absolute', bottom: '150px', left: '50%', transform: 'translateX(-50%)' }} onClick={() => window.location.reload()}>Generate New Dialogue</button>
    </div>
  );
};

export default DialogueGenerator;
