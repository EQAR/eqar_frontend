import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button
} from 'reactstrap';
import { Formik, Form } from 'formik';
import Yup from 'yup'
import axios from "axios/index";
import { toast } from 'react-toastify';
import TextInput from "../../components/FormComponents/TextInput";
import { POST_PASSWORD } from '../../config';


/* Validation */
function equalTo(ref, msg) {
  return Yup.mixed().test({
    name: 'equalTo',
    exclusive: false,
    message: msg || '${path} must be the same as ${reference}',
    params: {
      reference: ref.path,
    },
    test: function(value) {
      return value === this.resolve(ref);
    },
  });
}
Yup.addMethod(Yup.string, 'equalTo', equalTo);

const validationSchema = Yup.object().shape({
    current_password: Yup.string().required('Current Password is required'),
    new_password: Yup.string().required('New Password is required'),
    re_new_password: Yup.string().equalTo(Yup.ref('new_password'), 'Passwords must match')
      .required('Retype New Password is required')
});

const initialValues = {
  current_password: '',
  re_new_password: '',
  new_password: ''
};

const onSubmit = (values, { resetForm, setErrors, setStatus, setSubmitting}) => {
  return axios.post(POST_PASSWORD, values)
    .then(function (response) {
      toast.success("Password has been updated!");
      resetForm();
    })
    .catch(function (error) {
      if (error.response.status === 400) {
        setErrors(error.response.data);
      }
      toast.error("Error!");
    });
};

const ChangePasswordForm = () => (
  <Card>
    <CardHeader>
      <Row>
        <Col>Change Password</Col>
      </Row>
    </CardHeader>
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <div>
          <Form>
            <CardBody>
              <TextInput
                name="current_password"
                type="password"
                label="Current Password"
                error={touched.current_password && errors.current_password}
                value={values.current_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextInput
                name="new_password"
                type="password"
                label="New Password"
                error={touched.new_password && errors.new_password}
                value={values.new_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextInput
                name="re_new_password"
                type="password"
                label="Retype New Password"
                error={touched.re_new_password && errors.re_new_password}
                value={values.re_new_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" disabled={isSubmitting} color="primary">Submit</Button>
            </CardFooter>
          </Form>
        </div>
      )}
      />
  </Card>
);

export default ChangePasswordForm;
