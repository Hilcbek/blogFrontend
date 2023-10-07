import { create } from 'zustand'

const LoginModal = create((set) => ({
    open : false,
    onOpen : () => set({ open : true }),
    onClose : () => set({ open : false })
}))
export default LoginModal;