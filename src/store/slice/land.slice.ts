import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store'

interface landState {
  round: number
}

const initialState: landState = {
  round: 1
}

export const landSlice = createSlice({
  name: 'land',
  initialState,
  reducers: {
    incrementRound: (state, action: PayloadAction<number>) => {
      state.round = action.payload
    }
  }
})

export const selectRound = (state: RootState) => state.landSlice.round
export const { incrementRound } = landSlice.actions
export default landSlice.reducer
