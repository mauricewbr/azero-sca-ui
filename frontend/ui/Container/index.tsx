import cx from 'classnames'
import * as React from 'react'

type ContainerProps = React.ComponentPropsWithoutRef<'div'>
/**
 * Container component
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const { className, ...rest } = props

  return <div ref={ref} className={cx(className, 'container mx-auto max-w-screen-xl')} {...rest} />
})

Container.displayName = 'Container'
