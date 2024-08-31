import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Users from "./users"; // وارد کردن کامپوننت کاربران

class ModalTest extends Component {
  state = {
    firstName: "",
    lastName: "",
    nationalCode: "",
    phoneNumber: "",
    isFormValid: false,
    errors: {
      firstName: "",
      lastName: "",
      nationalCode: "",
      phoneNumber: "",
    },
    submittedData: null,
  };

  validateForm = () => {
    const { firstName, lastName, nationalCode, phoneNumber, errors } =
      this.state;
    const isFormValid =
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      nationalCode.length === 10 &&
      /^\d{10}$/.test(nationalCode) &&
      phoneNumber.length === 11 &&
      /^09\d{9}$/.test(phoneNumber) &&
      errors.firstName === "" &&
      errors.lastName === "" &&
      errors.nationalCode === "" &&
      errors.phoneNumber === "";

    this.setState({ isFormValid });
  };

  handleChange = (e) => {
    const { id, value } = e.target;
    let errors = { ...this.state.errors };

    if (id === "firstName") {
      if (/[^a-zA-Zآ-ی\s]/.test(value)) {
        errors.firstName = "نام باید فقط شامل حروف باشد.";
      } else {
        errors.firstName = "";
      }
    }

    if (id === "lastName") {
      if (/[^a-zA-Zآ-ی\s]/.test(value)) {
        errors.lastName = "نام خانوادگی باید فقط شامل حروف باشد.";
      } else {
        errors.lastName = "";
      }
    }

    if (id === "nationalCode") {
      if (!/^\d*$/.test(value) || value.length > 10) {
        errors.nationalCode = "کد ملی باید یک عدد صحیح 10 رقمی باشد.";
      } else {
        errors.nationalCode = "";
      }
    }

    if (id === "phoneNumber") {
      if (!/^09\d*$/.test(value) || value.length > 11) {
        errors.phoneNumber =
          "تلفن همراه باید یک عدد 11 رقمی باشد و با 09 شروع شود.";
      } else {
        errors.phoneNumber = "";
      }
    }

    this.setState({ [id]: value, errors }, this.validateForm);
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = () => {
    const { firstName, lastName, nationalCode, phoneNumber } = this.state;

    const data = {
      firstName,
      lastName,
      nationalCode,
      phoneNumber,
    };

    axios
      .post("https://postman-echo.com/post", data)
      .then((response) => {
        this.setState({ submittedData: response.data.data });
        console.log("Submitted Data:", this.state.submittedData);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  render() {
    const {
      firstName,
      lastName,
      nationalCode,
      phoneNumber,
      isFormValid,
      errors,
      submittedData,
    } = this.state;

    return (
      <>
        <div
          className="modal fade"
          id="registerModal"
          tabIndex="-1"
          aria-labelledby="registerModalLabel"
          aria-hidden="true"
          ref={this.modalRef} // تنظیم Ref برای Modal
        >
          <div className="modal-dialog">
            <div
              className="modal-content text-end"
              style={{ direction: "rtl", fontFamily: "IRANSans, sans-serif" }}
            >
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close ms-auto"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{ position: "absolute", left: "1rem" }}
                ></button>
                <h5 className="modal-title mx-auto" id="registerModalLabel">
                  فرم ثبت‌نام
                </h5>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      نام:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      value={firstName}
                      onChange={this.handleChange}
                      required
                    />
                    {errors.firstName && (
                      <div className="text-danger">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      نام خانوادگی:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      value={lastName}
                      onChange={this.handleChange}
                      required
                    />
                    {errors.lastName && (
                      <div className="text-danger">{errors.lastName}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="nationalCode" className="form-label">
                      کد ملی:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nationalCode"
                      value={nationalCode}
                      onChange={this.handleChange}
                      required
                    />
                    {errors.nationalCode && (
                      <div className="text-danger">{errors.nationalCode}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                      تلفن همراه:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={this.handleChange}
                      required
                    />
                    {errors.phoneNumber && (
                      <div className="text-danger">{errors.phoneNumber}</div>
                    )}
                  </div>
                  {/* اضافه کردن div برای انتخاب عکس */}
                  <div className="mb-3">
                    <label htmlFor="photoUpload" className="form-label">
                      انتخاب عکس:
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="photoUpload"
                      accept="image/*"
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  انصراف
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!isFormValid}
                  onClick={this.handleSubmit}
                  data-bs-dismiss="modal"
                >
                  ثبت نام
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ارسال داده‌ها به کامپوننت کاربران برای نمایش */}
        <usersdCurrent submittedData={submittedData} />
      </>
    );
  }
}

export default ModalTest;
