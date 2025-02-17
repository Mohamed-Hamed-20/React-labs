import React from "react";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login = () => {
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .matches(
        /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Invaild Password not strong enough"
      )
      .required("Required"),
  });

  const submit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        data
      );
      console.log(response);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const data = {
    email: "spoap",
    password: "sczlc;m",
  };

  const formix = useFormik({
    initialValues: data,
    loginSchema,
    onSubmit: submit,
  });

  return (
    <div className="container">
      <form onSubmit={formix.handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email :{" "}
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={formix.values.email}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={formix.values.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;

// export const ValidationSchemaExample = () => (
//   <div>
//     <h1>Signup</h1>
//     <Formik
//       initialValues={{
//         firstName: "",
//         lastName: "",
//         email: "",
//       }}
//       validationSchema={SignupSchema}
//       onSubmit={(values) => {
//         // same shape as initial values
//         console.log(values);
//       }}
//     >
//       {({ errors, touched }) => (
//         <Form>
//           <Field name="firstName" />
//           {errors.firstName && touched.firstName ? (
//             <div>{errors.firstName}</div>
//           ) : null}
//           <Field name="lastName" />
//           {errors.lastName && touched.lastName ? (
//             <div>{errors.lastName}</div>
//           ) : null}
//           <Field name="email" type="email" />
//           {errors.email && touched.email ? <div>{errors.email}</div> : null}
//           <button type="submit">Submit</button>
//         </Form>
//       )}
//     </Formik>
//   </div>
// );
