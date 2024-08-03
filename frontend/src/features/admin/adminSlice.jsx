import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  admin: [],
};
export const adminReducer = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addAdmin: (state, action) => {
      const {
        _id,
        department,
        firstname,
        lastname,
        gender,
        phonenumber,
        email,
        image,
        location,
      } = action.payload;
      const admin = {
        id: nanoid(),
        _id: _id,
        department: department,
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        phonenumber: phonenumber,
        email: email,
        image: image,
        location: location,
      };
      state.admin.push(admin);
    },
    removeAdmin: (state, action) => {
      state.admin = state.admin.filter((todo) => todo.id !== action.payload);
    },
    setAdmin: (state, action) => {
      const admins = action.payload.map((todo) => ({
        id: nanoid(),
        department: todo.department,
        firstname: todo.firstname,
        lastname: todo.lastname,
        gender: todo.gender,
        phonenumber: todo.phonenumber,
        email: todo.email,
        image: todo.image,
        location: todo.location,
        _id: todo._id,
      }));
      state.admin = admins;
    },
    updateAdmin: (state, action) => {
      const {
        id,
        department,
        firstname,
        lastname,
        gender,
        phonenumber,
        email,
        image,
        location,
      } = action.payload;
      const existingTodo = state.admin.find((todo) => todo.id === id);
      if (existingTodo) {
        (existingTodo.department = department),
          (existingTodo.firstname = firstname),
          (existingTodo.lastname = lastname),
          (existingTodo.gender = gender),
          (existingTodo.phonenumber = phonenumber),
          (existingTodo.email = email),
          (existingTodo.image = image),
          (existingTodo.location = location);
      }
    },
  },
});
export const { addAdmin, removeAdmin, setAdmin, updateAdmin } =
  adminReducer.actions;
export default adminReducer.reducer;
