import React from "react";
import {
  Formik,
  Field,
  Form,
  FieldArray,
} from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Select,
  MenuItem,
} from "@material-ui/core";
import * as Yup from "yup";
import { MUIRadio, MUITextField } from './components/MuiComponents.js'

const branches = {
  branchOne: "ONLINE_SCREENING",
  branchTwo: "DIRECT_PICKUP_BAG",
  branchThree: "DROP_OFF",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required().max(10),
  clothes: Yup.array().of(
    Yup.object({
      brand: Yup.string().required(),
    })
  ),
});

const App = () => {
  return (
    <div>
      <Formik
        validateOnChange={true}
        initialValues={{
          firstName: "",
          lastName: "",
          acceptedTerms: false,
          newsletterConsent: false,
          handlingMethod: "",
          clothes: [{ brand: "Your first item", condition: "NEW", price: 0 }],
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // make async call
          console.log("submit: ", data);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <MUITextField placeholder="First Name" name="firstName" />
            <div>
              <Field
                placeholder="Last Name"
                name="lastName"
                type="input"
                as={TextField}
              />
            </div>
            <div>How would you like us to handle your pre-owned items?</div>
            <MUIRadio
              name="handlingMethod"
              type="radio"
              value={branches.branchOne}
              label="Online Screening"
            />
            <MUIRadio
              name="handlingMethod"
              type="radio"
              value={branches.branchTwo}
              label="Direct Pick-Up Bag"
            />
            <MUIRadio
              name="handlingMethod"
              type="radio"
              value={branches.branchThree}
              label="Drop-Off"
            />
            <FieldArray name="clothes">
              {(arrayHelpers) => (
                <div>
                  <Button
                    onClick={() =>
                      arrayHelpers.push({
                        brand: "",
                        condition: "",
                        price: 0,
                        image: "",
                      })
                    }
                  >
                    add item
                  </Button>
                  {values.clothes.map((clothes, index) => {
                    return (
                      <div key={clothes.id}>
                        <MUITextField
                          placeholder="Brand"
                          name={`clothes.${index}.name`}
                        />
                        <Field
                          name={`clothes.${index}.condition`}
                          type="select"
                          as={Select}
                        >
                          <MenuItem value="NEW">NEW</MenuItem>
                          <MenuItem value="LIKE_NEW">LIKE NEW</MenuItem>
                          <MenuItem value="USED_GOOD">USED (GOOD)</MenuItem>
                          <MenuItem value="USED_FAIR">USED (FAIR)</MenuItem>
                        </Field>
                        <MUITextField
                          placeholder="Price"
                          name={`clothes.${index}.price`}
                        />
                        <Button onClick={() => arrayHelpers.remove(index)}>
                          x
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </FieldArray>
            <div>
              <p>I accept the terms and conditions.</p>
              <Field name="acceptedTerms" type="checkbox" as={Checkbox} />
            </div>
            <div>
              <p>Do you want to subscribe to our newsletter?</p>
              <Field name="newsletterConsent" type="checkbox" as={Checkbox} />
            </div>
            <div>
              <Button disabled={isSubmitting} type="submit">
                submit
              </Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
