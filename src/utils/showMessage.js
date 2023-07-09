import Swal from "sweetalert2";

export const successMessage = (message) => {
  return Swal.fire({
    html: message,
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    position: "top-end",
    background: "rgb(255, 221, 0)",
  });
};

export const loginSuccessMessage = (message) => {
  return Swal.fire({
    html: message,
    showConfirmButton: true,
    position: "center",
    imageHeight: 50,
    focusConfirm: false,
    color: "#000",
    background: "#fff",
    backdrop: `rgba(36, 27, 2,0.4)`,
  });
};

export const errorMessage = (message, code) => {
  Swal.fire({
    html: code ? `${message} (${code})` : `${message}`,
    focusConfirm: false,
    color: "#000",
    background: "#fff",
    backdrop: `rgba(36, 27, 2,0.4)`,
  });
};

export const catchMessage = (error) => {
  console.log("catch error :", error);
  return Swal.fire({
    text: `The operation failed (501)`,
    confirmButtonText: "OK",
    focusConfirm: false,
    color: "#000",
    background: "#fff",
    backdrop: `rgba(36, 27, 2,0.4)`,
  });
};

export const dataErrorsMessage = (dataErrors) => {
  return Swal.fire({
    html: dataErrors,
    confirmButtonText: "OK",
    focusConfirm: false,
    color: "#000",
    background: "#fff",
    backdrop: `rgba(36, 27, 2,0.4)`,
  });
};

export const deleteMessage = async () => {
  return Swal.fire({
    title: "",
    text: "Do you want to delete?",
    showCloseButton: false,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    color: "#000",
    background: "#fff",
    backdrop: `rgba(36, 27, 2,0.4)`,
  }).then((result) => {
    if (result.isConfirmed) {
      return true;
    }
  });
};

export const confirmMessage = async (message) => {
  return Swal.fire({
    title: "",
    text: message,
    showCloseButton: false,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    color: "#000",
    background: "#fff",
    backdrop: `rgba(36, 27, 2,0.4)`,
  }).then((result) => {
    if (result.isConfirmed) {
      return true;
    }
  });
};
