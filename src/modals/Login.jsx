import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../services/intermediary'
import { LOGIN_MODAL_KEY } from '../constants/modals'
import { Modal, ModalContent, ModalHeader } from '@nextui-org/react'
import { ERROR_STATUS, EXCEPTION_STATUS, SUCCESS_STATUS } from '../constants/states'
import { ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'
import { DASHBOARD_PAGE_PATH } from '../constants/paths'
import { ToastContainer, toast } from 'react-toastify'
import { toCamelCase } from '../services/components'
import { CircularProgress } from '@nextui-org/react'
import { ENTER_KEYS } from '../constants/keyboard'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/Auth'

const Login = ({ isOpen, onOpenChange }) => {
  const [translate] = useTranslation(LOGIN_MODAL_KEY)
  const { updateUserData } = useAuth()
  const navigate = useNavigate()

  const handleValidate = ({ username, password }) => {
    const errors = {}

    if (!username) {
      errors.username = translate('form.errors.text.empty.username')
    }

    if (!password) {
      errors.password = translate('form.errors.text.empty.password')
    }

    return errors
  }

  const handleSubmit = async ({ username, password }) => {
    if ([username, password].includes('')) {
      toast(translate('form.submissions.text.empty'), { type: 'warning' })
    } else {
      const response = await signIn(username, password)

      if (response?.status === SUCCESS_STATUS) {
        const user = {}

        response.data.keys.forEach((key) => {
          const newKey = toCamelCase(key)
          const value = response.data.values[key]
          user[newKey] = value
        })

        updateUserData(user)
        navigate(DASHBOARD_PAGE_PATH)
      }

      if (response?.status === EXCEPTION_STATUS) {
        toast(translate('form.responses.text.exception'), { type: 'error' })
      }

      if (response?.status === ERROR_STATUS) {
        toast(translate('form.responses.text.error'), { type: 'warning' })
      }
    }
  }

  return (
    <Modal placement="top-center" onOpenChange={onOpenChange} isDismissable={false} isOpen={isOpen}>
      <ToastContainer />

      <ModalContent>
        {(onClose) => (
          <Formik
            initialValues={{ username: '', password: '' }}
            validate={handleValidate}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
              <>
                <ModalHeader className="flex flex-col gap-1">{translate('title')}</ModalHeader>

                {isSubmitting ? (
                  <ModalBody className="py-4">
                    <CircularProgress
                      className="max-w-md"
                      label={translate('form.submissions.text.loading')}
                      isIndeterminate
                      size="md"
                    />
                  </ModalBody>
                ) : (
                  <>
                    <ModalBody>
                      <Input
                        type="text"
                        name="username"
                        label={translate('form.labels.text.username')}
                        placeholder={translate('form.labels.placeholder.username')}
                        onKeyUp={({ code }) => ENTER_KEYS.includes(code) && handleSubmit()}
                        onChange={handleChange}
                        value={values.username}
                        variant="underlined"
                        size="lg"
                      />

                      <p className="text-red-600 text-sm">
                        {errors.username && touched.username && errors.username}
                      </p>

                      <Input
                        type="text"
                        name="password"
                        label={translate('form.labels.text.password')}
                        placeholder={translate('form.labels.placeholder.password')}
                        onKeyUp={({ code }) => ENTER_KEYS.includes(code) && handleSubmit()}
                        onChange={handleChange}
                        value={values.password}
                        variant="underlined"
                        size="lg"
                      />

                      <p className="text-red-600 text-sm">
                        {errors.password && touched.password && errors.password}
                      </p>
                    </ModalBody>

                    <ModalFooter>
                      <Button color="danger" onPress={onClose} variant="ghost">
                        {translate('form.buttons.text.close')}
                      </Button>

                      <Button
                        color="primary"
                        isDisabled={isSubmitting}
                        onPress={handleSubmit}
                        variant="ghost"
                        type="submit"
                      >
                        {translate('form.buttons.text.login')}
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </>
            )}
          </Formik>
        )}
      </ModalContent>
    </Modal>
  )
}

export default Login
