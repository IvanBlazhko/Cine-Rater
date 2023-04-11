import React, { useContext, useState, useEffect } from 'react';

import { SaveContext } from '../../providers/saveProvider/saveProvider';
import { ISaveItem } from '../../interfaces/saveItem.interface';

const Buttons: React.FC<ISaveItem> = ({ id, title, img }) => {
  const { removeOnSave, saved, addOnSave } = useContext(SaveContext);

  const [isFavorite, setIsFavorite] = useState(false);

  const handleSave = () => {
    const item: ISaveItem = {
      id,
      title,
      img,
    };

    if (addOnSave) addOnSave(item);
  };

  useEffect(() => {
    if (saved?.some(obj => obj.id === id)) {
      return setIsFavorite(true);
    }
    setIsFavorite(false);
  }, [id, saved]);

  return (
    <>
      {isFavorite && removeOnSave ? (
        <span className="follow-btn" onClick={() => removeOnSave(id)}>
          Remove of Follow
        </span>
      ) : (
        <span className="follow-btn" onClick={() => handleSave()}>
          Follow
        </span>
      )}
    </>
  );
};

export default Buttons;
