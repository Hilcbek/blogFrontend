import { create } from 'zustand'

const EditModal = create((set) => ({
    open : false,
    onOpen : () => set({ open : true }),
    onClose : () => set({ open : false })
}))
export default EditModal;