import React, { useState, useRef } from 'react'
import { Input, Button, Dialog, FormItem, FormContainer } from 'components/ui'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'
import { PasswordInput } from 'components/shared'

const StatusForm = (props) => {
    const [message, setMessage] = useTimeOutMessage()

    const [dialogIsOpen, setIsOpen] = useState(false)

    const validationSchema = Yup.object().shape({
        // Define a required string for the "password" field
        password: Yup.string().required('Password is required'),
    })

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = () => {
        setIsOpen(false)
    }

    const onDialogOk = () => {
        console.log('Dialog')
    }

    return (
        <>
            <div className="xl:min-w-[650px] px-8 flex flex-col gap-2">
                <div className="flex justify-between">
                    <h5>General Status</h5>
                    <div>Temporary status</div>
                </div>
                <div className="flex justify-between">
                    <h5>Online ordering</h5>
                    <div>Temporary status</div>
                </div>
                <div className="flex justify-between">
                    <h5>Last Update</h5>
                    <div>Temporary status</div>
                </div>
                <div className="flex justify-between">
                    <h5>Ordering Timetable</h5>
                    <div>Temporary status</div>
                </div>
                <div className="flex justify-between">
                    <h5>Ordering Types Enabled</h5>
                    <div>Temporary status</div>
                </div>
                <Button
                    color="yellow-600"
                    variant="solid"
                    onClick={() => openDialog()}
                >
                    GIVE ME A BREAK!
                </Button>
                <Button
                    color="green-600"
                    variant="solid"
                    onClick={() => openDialog()}
                >
                    ENABLE ONLINE ORDERS
                </Button>
            </div>
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">Request a break?</h5>
                <p>If you want to request a break please input the password</p>

                <Formik
                    initialValues={{ password: '' }} // Set initial values of the form
                    validationSchema={validationSchema} // Validation schema
                    onSubmit={(values, { setSubmitting }) => {
                        // Handle form submission
                        console.log(values)
                        setTimeout(() => {
                            setSubmitting(false)
                            console.log('submitted')
                        }, 1000)
                    }}
                >
                    {({ touched, errors, isSubmitting }) => (
                        <Form>
                            <FormContainer>
                                <FormItem
                                    label="Password"
                                    invalid={
                                        errors.password && touched.password
                                    }
                                    errorMessage={errors.password}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="password"
                                        placeholder="Password"
                                        component={PasswordInput}
                                    />
                                </FormItem>
                                <ErrorMessage name="password" component="div" />
                            </FormContainer>
                            
                            <div className="text-right mt-6">
                                <Button
                                    className="ltr:mr-2 rtl:ml-2"
                                    variant="plain"
                                    onClick={onDialogClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="solid"
                                    loading={isSubmitting}
                                    onClick={onDialogOk}
                                    type="submit"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    )
}

export default StatusForm
