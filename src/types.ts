/*
 * @adonisjs/health
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export type HealthCheckResult = {
  /**
   * A summary of the check result
   */
  message: string

  /**
   * The status of the check.
   */
  status: 'ok' | 'warning' | 'error'

  /**
   * Date/time when this check was completed
   */
  finishedAt: Date

  /**
   * An meta-data associated with the check
   */
  meta?: Record<string, any>
}

/**
 * The health check report generated by the health check
 * runner
 */
export type HealthCheckReport = {
  /**
   * Is the entire report healthy. The value will be set to
   * false when one or more of the checks has a status or
   * "error"
   */
  isHealthy: boolean

  /**
   * Status of the entire report.
   *
   * - Set to "ok" when all checks have ok status
   * - Set to "warning" when one or more checks have warning status
   * - Set to "error" when one or more checks have error status
   */
  status: 'ok' | 'warning' | 'error'

  /**
   * The date/time when the entire report was computed
   */
  finishedAt: Date

  /**
   * Perform checks and their report
   */
  checks: ({ isCached: boolean; name: string } & HealthCheckResult)[]
}

/**
 * Health checks must adhere to the HealthCheckContract
 */
export interface HealthCheckContract {
  /**
   * A unique name for the check
   */
  name: string

  /**
   * Whether to cache the results or not. The value must be
   * specified in seconds
   */
  cacheDuration?: number

  /**
   * The method to execute to perform the check
   */
  run(): Promise<HealthCheckResult>
}
