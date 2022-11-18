import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import './watchlist.css'
import WatchlistForm from './watchlistUpdate';

function WatchlistFromModal({id}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='options-button' onClick={(e) => {
        e.stopPropagation()
        setShowModal(true)
      }}>
        <div className='options-icon-text'
        // onClick={(e) => e.stopPropagation()}
        >
          <i class="fa-solid fa-gear"
          style={{paddingRight: '3px'}}
          ></i>
          <span>Edit List</span>
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
