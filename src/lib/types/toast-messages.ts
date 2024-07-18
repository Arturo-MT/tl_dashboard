interface ToastMessage {
  title: string
  description: string
  variant: 'destructive' | 'default' | null | undefined
}

export const toastErrorMessages = {
  loginError: {
    title: 'Hubo un error en el inicio de sesión',
    description: 'No se encontró el usuario o la contraseña es incorrecta.',
    variant: 'destructive'
  } as ToastMessage,
  networkError: {
    title: 'Error de red',
    description:
      'Hubo un problema con la conexión a la red. Por favor, inténtelo de nuevo más tarde.',
    variant: 'destructive'
  } as ToastMessage,
  unknownError: {
    title: 'Error desconocido',
    description: 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo.',
    variant: 'destructive'
  } as ToastMessage,
  registerError: {
    title: 'Error al registrar el usuario',
    description:
      'Hubo un error al registrar el usuario. Por favor, inténtelo de nuevo.',
    variant: 'destructive'
  } as ToastMessage,
  loginAfterRegisterError: {
    title: 'Error al iniciar sesión',
    description:
      'Hubo un error al iniciar sesión después de registrar el usuario. Por favor, inicie sesión manualmente.',
    variant: 'destructive'
  } as ToastMessage
}
