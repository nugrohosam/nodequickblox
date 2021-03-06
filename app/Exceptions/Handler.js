'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const sentry = use('Sentry')
const Antl = use('Antl')
const Config = use('Config')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { request, response }) {
    if (Config.get('app.env') == Config.get('app.env_testing')) {
      return error
    } else if (error.status != 500) {
      return response.status(error.status).json(error.message)
    } else {
      return response.status(error.status).json(Antl.formatMessage('errors.server_error'))
    }
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {
    sentry.captureException(error)
  }
}

module.exports = ExceptionHandler
