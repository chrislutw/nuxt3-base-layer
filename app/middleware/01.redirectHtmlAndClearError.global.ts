export default defineNuxtRouteMiddleware((to, from) => {
  const error = useError()
  if (from.path.endsWith('/index.html') && error.value?.statusCode === 404) {
    error.value = undefined
  }

  if (to.path.endsWith('/index.html')) {
    return navigateTo(to.path.slice(0, -11))
  }
})
