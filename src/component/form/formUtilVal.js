import { setError, setValue } from "../redux/slice/formSlice";

async function checkValues(event, values, dispatch, inputRefs) {
  const inputs = Array.from(inputRefs.current);
  let hasError = false;

  inputs.forEach((input) => {
    if (!input.value) {
      hasError = true;
      input.classList.add("has-error");
    } else {
      input.classList.remove("has-error");
    }
  });

  if (hasError) {
    event.preventDefault();
    dispatch(setError("all fields are required! 1"));

    return false;
  } else {
    dispatch(setError(null));
    dispatch(setValue({ field: "name", value: values.name.trim() }));
    dispatch(setValue({ field: "email", value: values.email.trim() }));
    return true;
  }
}

export default checkValues;
