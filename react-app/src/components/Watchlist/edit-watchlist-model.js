import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import './watchlist.css'
import WatchlistForm from './watchlistUpdate';

function WatchlistFromModal({id}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='options-button' onClick={() => setShowModal(true)}>
        <div className='options-icon-text'>
          <i class="fa-solid fa-gear"></i> Edit List
        </div>

        </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <WatchlistForm id ={id}/>
        </Modal>
      )}
    </>
  )
}

export default WatchlistFromModal;
