import { create } from 'zustand'

const AddModal = create((set) => ({
    open : false,
    onOpen : () => set({ open : true }),
    onClose : () => set({ open : false })
}))
export default AddModal;