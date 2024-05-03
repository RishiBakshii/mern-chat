import { createPortal } from "react-dom"

type PropTypes  = {
    onClose:()=>void
    isOpen:boolean
    children:React.ReactNode
    width?:string
    height?:string
}

export const Modal = ({isOpen=false,onClose,children,width="30rem",height="30rem"}:PropTypes) => {

  return (
    isOpen ? 
    createPortal(
    <div onClick={onClose} className="bg-black bg-opacity-15 w-screen h-screen absolute flex items-center justify-center">
        <div onClick={e=>e.stopPropagation()} className={`bg-white w-[${width}] h-[${height}] rounded-lg p-4 shadow-xl`}>
            {children}
        </div>
    </div>,
    document.getElementById("overlays") as HTMLElement
    ):null
  )
}
