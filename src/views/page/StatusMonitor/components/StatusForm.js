import React, { useState } from 'react'
import { Input, Button, Dialog, FormItem, FormContainer } from 'components/ui'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { PasswordInput } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import { apiUpdateExpoStatus } from 'services/ExpoService'

const StatusForm = (props) => {
    const { currentStatus, breakStatus, message } = useSelector(
        (state) => state.base.status
    )
    const [stateCase, setStateCase] = useState('ordering')

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
                    onClick={() => {
                        openDialog()
                        setStateCase('break')
                    }}
                >
                    GIVE ME A BREAK!
                </Button>
                <Button
                    color="green-600"
                    variant="solid"
                    onClick={() => {
                        openDialog()
                        setStateCase('ordering')
                    }}
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
                    onSubmit={async (values, { setSubmitting }) => {
                        // Handle form submission
                        const data = {
                            type: stateCase,
                            enabled: true,
                        }
                        const response = await apiUpdateExpoStatus(data)
                        setSubmitting(false)
                        onDialogClose()
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
