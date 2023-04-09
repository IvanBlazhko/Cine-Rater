import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

import { useParams } from 'react-router-dom';
import { fetchTrailer } from '../../api/movieAPI';
import { ITrailer } from '../../interfaces/trailer.interface';

import MovieTitle from '../../components/movie/movieTitle';
import Loader from '../../components/loader/loader';
import Reviews from '../../components/reviews/reviews';
import Buttons from '../../components/buttons/buttons';

const Trailer: React.FC = () => {
  const { id, title, img } = useParams();

  const [stateData, setStateData] = useState('fulfilled');
  const [data, setData] = useState<ITrailer | null>(null);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          setStateData('pending');

          const data: ITrailer[] = await fetchTrailer(id);
          setStateData('fulfilled');

          const indexTrailer = data.findIndex(item =>
            item.type.includes('Trailer')
          );

          indexTrailer ? setData(data[indexTrailer]) : setData(data[0]);
        } catch {
          setStateData('rejected');
        }
      })();
    }
  }, [id]);

  return (
    <>
      <div className="trailer__head">
        <MovieTitle title={title ? title : ''} />
        <div className="movie__details__btn head__buttons">
          <Buttons
            id={id ? id : ''}
            title={title ? title : ''}
            img={img ? img : ''}
          />
        </div>
      </div>
      {!data && stateData !== 'pending' && (
        <div className="error">Sorry, we couldn't find a trailer.</div>
      )}
      {stateData === 'pending' && <Loader />}
      {data && (
        <div className="trailer__player">
          <ReactPlayer
            url={`https://www.${data.site.toLowerCase()}.com/watch?v=${
              data.key
            }`}
            controls={true}
            loop
            width="100%"
            height="100%"
          />
        </div>
      )}
      {id && <Reviews id={id} />}
    </>
  );
};

export default Trailer;
