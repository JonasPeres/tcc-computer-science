import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import Loader from '../loader/loader.component'
import './input.component.scoped.scss'
import './input.component.scss'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label?: any
  disabled?: boolean
  readOnly?: boolean
  errorSpan?: boolean
  noCounting?: boolean
  maxLength?: number
  loading?: boolean
  required?: boolean
  externalError?: any
  errorIcon?: any
  id?: string
  name?: string
  type?:
    | 'text'
    | 'number'
    | 'textarea'
    | 'email'
    | 'tel'
    | 'url'
    | 'search'
    | 'date'
    | 'datetime-local'
    | 'time'
    | 'month'
    | 'week'
    | 'color'
    | 'password'
    | 'hidden'
  leftLabel?: any
  rightLabel?: any
  externalIcon?: any
  value?: any
  placeholder?: string
  min?: number | string
  max?: number | string
  backgroundColor?: string
  autoComplete?: string
  requiredOnLoad?: boolean
  autoFocus?: boolean
  onChange?: (event: any) => any
  onValidate?: (event: any) => any
  onTimeout?: (event: any) => any
  onBlur?: (value: any, event?: ChangeEvent<HTMLInputElement>) => any
}

export interface State {
  error: string
  value: any
}

export default ({
  label,
  disabled = false,
  readOnly = false,
  errorSpan = true,
  noCounting = false,
  maxLength,
  loading,
  required,
  requiredOnLoad = false,
  externalError,
  errorIcon = <i className="fa-regular fa-exclamation-triangle"></i>,
  id,
  name,
  type = 'text',
  leftLabel,
  rightLabel,
  externalIcon,
  value = '',
  placeholder,
  min,
  max,
  backgroundColor = '',
  autoComplete = 'off',
  className = '',
  autoFocus = false,
  onChange,
  style,
  onBlur,
}: Props) => {
  const timestamp = `random-id-${(1 + Date.now() + Math.random()).toString().replace('.', '')}`
  const [state, setState] = useState<State>({
    value: value,
    error: '',
  })

  useEffect(() => {
    if (state.value !== value) {
      handleChange(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, state.value])

  const handleBlur = useCallback(
    (event: any) => {
      if (onBlur && typeof onBlur === 'function') {
        onBlur(state.value, event)
      }
    },
    [onBlur, state.value]
  )

  const handleChange = (event: any) => {
    state.value = event?.target?.value || (event?.length ? event : '')

    setState({ ...state })
    if (onChange && typeof onChange === 'function') {
      onChange(state.value)
    }
  }

  return (
    <div className={`wrapper-all-inside-input ${className}`}>
      {label ? (
        <label className={'label ' + `${externalError || state.error ? 'error ' : ''}`} htmlFor={id || timestamp}>
          {label}
        </label>
      ) : null}
      <div
        className={
          'no-padding wrapper-input wrapper-input-squid ' +
          `${externalError || state.error ? 'error ' : ''}` +
          `${type === 'textarea' ? 'textarea ' : ''}`
        }
      >
        {leftLabel ? <span className="input-group-text">{leftLabel}</span> : null}
        {type !== 'textarea' ? (
          <input
            className={
              'col input ' +
              `${readOnly ? 'readonly ' : ''}` +
              `${disabled ? 'disabled ' : ''}` +
              `${loading ? 'loading ' : ''}` +
              `${type === 'number' ? 'has-icon-extra-padding ' : ''}` +
              `${externalError || state.error ? 'error ' : ''}` +
              `${externalIcon ? 'has-icon-external ' : ''}`
            }
            style={{
              backgroundColor: backgroundColor,
              ...style,
            }}
            id={id || timestamp}
            type={type || 'text'}
            name={name || timestamp}
            placeholder={placeholder || ''}
            value={state.value}
            maxLength={maxLength}
            required={required}
            disabled={disabled}
            readOnly={readOnly || loading}
            min={min}
            max={max}
            onChange={handleChange}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            onBlur={handleBlur}
          />
        ) : (
          <textarea
            className={
              'col textarea scrollbar ' +
              `${externalError || state.error ? 'error ' : ''}` +
              `${readOnly ? 'readonly ' : ''}` +
              `${disabled ? 'disabled ' : ''}` +
              `${loading ? 'loading ' : ''}` +
              `${externalIcon ? 'has-icon-external ' : ''}`
            }
            style={{
              backgroundColor: backgroundColor,
            }}
            id={id || timestamp}
            name={name || timestamp}
            placeholder={placeholder || ''}
            maxLength={maxLength}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            onChange={handleChange}
            value={state.value}
            autoFocus={autoFocus}
            onBlur={handleBlur}
          />
        )}
        {rightLabel ? <span className="input-group-text">{rightLabel}</span> : null}
      </div>
      {loading ? (
        <Loader size="small" className={`display-block loader-input ${!label ? 'no-label' : ''}`} style={{ position: 'absolute' }} />
      ) : null}
      {externalIcon && !loading ? (
        <span className={'icon icon-external ' + `${type === 'textarea' ? 'textarea-icon ' : ''}` + `${!label ? 'no-label ' : ''}`}>
          {externalIcon}
        </span>
      ) : null}
      {errorSpan ? (
        <div className={'box-validation box-invalid show ' + `${maxLength ? 'has-max-length ' : ''}`}>
          {requiredOnLoad && !state.value && !state.error && !externalError ? (
            <div>
              <i className="fa-solid fa-diamond-exclamation gold"></i>
            </div>
          ) : null}
          {state.error || externalError ? errorIcon || <i className="fa-regular fa-exclamation-triangle"></i> : null}
          {externalError ? externalError : ''}
          {state.error && !externalError ? state.error : ''}
          {maxLength && !noCounting ? <span className="max-length-name">{maxLength - state.value?.length}</span> : null}
        </div>
      ) : null}
    </div>
  )
}
