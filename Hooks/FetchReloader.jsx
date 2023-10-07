import { create } from 'zustand'

const FetchRelaod = create((set) => ({
    refresh : false,
    ReloadNow : () => set({ refresh : true })
}))
export default FetchRelaod