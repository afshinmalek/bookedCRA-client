import { createSlice } from '@reduxjs/toolkit'

const formSlice = createSlice({
  name: 'form',
  initialState: {
    name:'',
    email:'',
    date: '',
    time:'',
    available:'',
    id:''
  },
  reducers:{
    addDate: state =>{
      state , 
    },

    addTime: state =>{

    },
    addNameEmail: state =>{

    },
    addAvailable: state =>{

    },
    addId: state => {

    }
  }
})

export const { addAvailable, addDate, addId, addNameEmail, addTime} = formSlice.actions


