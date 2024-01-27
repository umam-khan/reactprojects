import React from 'react'

const Modal = ({open, onClose, children}) => {
  return (
    //when user clicks on backdrop, onClose triggered
    <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}>
        {/* actual modal */}
        <div className={`bg-white rounded-xl shadow p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
        {children}
        </div>
       
    </div>
  )
}

export default Modal