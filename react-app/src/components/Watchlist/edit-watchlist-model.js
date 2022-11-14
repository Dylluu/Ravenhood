import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import './watchlist.css'
import WatchlistForm from './watchlistUpdate';

function WatchlistFromModal({id}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='options-button' onClick={() => setShowModal(true)}>Edit Watchlist</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <WatchlistForm id ={id}/>
        </Modal>
      )}
    </>
  )
}

export default WatchlistFromModal;
