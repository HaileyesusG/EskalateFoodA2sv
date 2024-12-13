import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  tech: [],
};
export const techReducer = createSlice({
  name: "tech",
  initialState,
  reducers: {
    addTech: (state, action) => {
      const {
        _id,
        department,
        firstname,
        lastname,
        gender,
        phonenumber,
        deposit,
        email,
        image,
        location,
        status,
        status2,
      } = action.payload;
      const tech = {
        id: nanoid(),
        _id: _id,
        department: department,
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        phonenumber: phonenumber,
        deposit: deposit,
        email: email,
        image: image,
        location: location,
        status: status,
        status2: status2,
      };
      state.tech.push(tech);
    },
    removeTech: (state, action) => {
      state.tech = state.tech.filter((todo) => todo.id !== action.payload);
    },
    setTech: (state, action) => {
      const techs = action.payload.map((todo) => ({
        id: nanoid(),
        department: todo.department,
        firstname: todo.firstname,
        lastname: todo.lastname,
        gender: todo.gender,
        phonenumber: todo.phonenumber,
        deposit: todo.deposit,
        email: todo.email,
        image: todo.image,
        location: todo.location,
        status: todo.status,
        status2: todo.status2,
        _id: todo._id,
      }));
      state.tech = techs;
    },
    updateTech: (state, action) => {
      const {
        id,
        department,
        firstname,
        lastname,
        gender,
        phonenumber,
        deposit,
        email,
        image,
        location,
        status,
        status2,
      } = action.payload;
      const existingTodo = state.tech.find((todo) => todo.id === id);
      if (existingTodo) {
        (existingTodo.department = department),
          (existingTodo.firstname = firstname),
          (existingTodo.lastname = lastname),
          (existingTodo.gender = gender),
          (existingTodo.phonenumber = phonenumber),
          (existingTodo.deposit = deposit),
          (existingTodo.email = email),
          (existingTodo.image = image),
          (existingTodo.status = status),
          (existingTodo.status2 = status2),
          (existingTodo.location = location);
      }
    },
    logOut: (state, action) => {
      state.tech = action.payload;
    },
  },
});
export const { addTech, removeTech, setTech, updateTech,logOut } = techReducer.actions;
export default techReducer.reducer;
