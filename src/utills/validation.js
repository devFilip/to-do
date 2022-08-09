export const validate = (value) => {
  const errors = {};
  if (value.trim() === "" || value.trim().length < 5)
    errors.add = "This field needs to have atleast 5 letters!";
  else delete errors.add;

  return Object.keys(errors).length === 0 ? null : errors;
};
export const validateProperty = (e) => {
  if (e.target.name === "add") {
    if (e.target.value.trim() === "" || e.target.value.trim().length < 5)
      return "This field needs to have atleast 5 letters!";
  }
};
