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

const validationSchema = Yup.object().shape({
    token: Yup.string(),
});

const initialValues = {
  token: localStorage.getItem('token'),
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

const ChangeTokenForm = () => (
  <Card>
    <CardHeader>
      <Row>
        <Col>API Token</Col>
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
                name="token"
                type="input"
                label="API Token"
                error={touched.token && errors.token}
                value={values.token}
                onChange={handleChange}
                onBlur={handleBlur}
                readOnly={true}
              />
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" disabled={true} color="primary">Generate New</Button>
            </CardFooter>
          </Form>
        </div>
      )}
      />
  </Card>
);

export default ChangeTokenForm;
