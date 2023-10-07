import { create } from 'zustand'

const RegisterModal = create((set) => ({
    open : false,
    onOpen : () => set({ open : true }),
    onClose : () => set({ open : false })
}))
export default RegisterModal;