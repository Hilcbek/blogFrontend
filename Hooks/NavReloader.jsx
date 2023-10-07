import { create } from 'zustand'

const Reloader = create((set) => ({
    reload :true,
    onReload : () => set({ reload : true })
}))
export default Reloader;